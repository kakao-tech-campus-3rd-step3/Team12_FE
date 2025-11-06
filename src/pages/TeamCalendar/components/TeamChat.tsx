import { teamAPI } from '@/apis';
import Button from '@/components/atoms/Button';
import { useTeamChat } from '@/hooks/team/useTeamChat';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { Send, Users } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface TeamChatProps {
  teamId: number;
  chatData: ReturnType<typeof useTeamChat>;
}

const TeamChat = ({ teamId, chatData }: TeamChatProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isConnected, sendMessage, loadMoreMessages, isLoadingMessages, hasMore } =
    chatData;
  const { user } = useAuthStore();

  const { data: teamInfo } = useQuery({
    queryKey: ['teamInfo', teamId],
    queryFn: () => teamAPI.getMyTeam(teamId),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef(0);
  const isFirstRenderRef = useRef(true);
  const lastMessageIdRef = useRef<number | null>(null);
  const isLoadingOldMessagesRef = useRef(false);

  useEffect(() => {
    if (isFirstRenderRef.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView();
      isFirstRenderRef.current = false;
      lastMessageIdRef.current = messages[messages.length - 1]?.id || null;
    }
  }, [messages]);

  //메세지 전송 -> 스크롤 이동
  useLayoutEffect(() => {
    if (!isFirstRenderRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const isNewMessage =
        lastMessageIdRef.current !== null && lastMessage.id !== lastMessageIdRef.current;

      // 과거 메시지 로드 중이 아니고, 새 메시지가 추가되었을 때만 스크롤
      if (isNewMessage && !isLoadingOldMessagesRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }

      lastMessageIdRef.current = lastMessage.id;
    }
  }, [messages]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container || isLoadingMessages || !hasMore) return;

    //최상단 -> 이전 메세지 추가 조회
    if (container.scrollTop === 0) {
      previousScrollHeightRef.current = container.scrollHeight;
      isLoadingOldMessagesRef.current = true;
      loadMoreMessages();
    }
  };

  //이전 메세지 조회 -> 스크롤 위치 고정
  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (container && previousScrollHeightRef.current > 0 && isLoadingOldMessagesRef.current) {
      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight;
        const scrollDiff = newScrollHeight - previousScrollHeightRef.current;

        const originalScrollBehavior = container.style.scrollBehavior;
        container.style.scrollBehavior = 'auto';
        container.scrollTop = scrollDiff;
        container.style.scrollBehavior = originalScrollBehavior;

        previousScrollHeightRef.current = 0;
        isLoadingOldMessagesRef.current = false;
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="flex relative flex-col w-full h-full bg-white rounded-xl border border-gray-200 shadow-lg z-[110]">
      {/* 헤더 */}
      <div className="flex sticky top-0 justify-between items-center px-5 py-3 bg-white">
        <div className="flex gap-2 items-center">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{teamInfo?.name || '팀 채팅'}</h3>
            <div className="flex mt-1 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5 mr-1" />
              {teamInfo?.count || 0}명
            </div>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="overflow-y-auto flex-1 px-4 py-5 space-y-1"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-400">
            <p className="text-sm">아직 메시지가 없습니다</p>
            <p className="mt-1 text-xs">첫 메시지를 보내보세요!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              //"나"인지 확인
              const isMyMessage = user?.user_id
                ? String(message.senderId) === String(user.user_id)
                : false;
              return (
                <div
                  key={message.id}
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'} max-w-[70%]`}
                  >
                    {!isMyMessage && (
                      <span className="px-1 mb-1 text-xs font-medium text-gray-700">
                        {message.senderName}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        isMyMessage
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="px-3 py-3 sm:px-3">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center min-w-0">
          <input
            type="text"
            placeholder="메시지 보내기"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={!isConnected}
            className="flex-1 min-w-0 px-4 py-2.5 bg-gray-100 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
          />
          <Button
            type="submit"
            icon={<Send className="-ml-1 w-5 h-5 rotate-45" />}
            className="justify-center text-white rounded-full shadow-md cursor-pointer p-y-2 flex-shrink-0"
            noWrapper
          />
        </form>
      </div>
    </div>
  );
};

export default TeamChat;
