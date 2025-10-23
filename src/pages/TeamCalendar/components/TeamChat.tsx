import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { useTeamChat } from '@/hooks/team/useTeamChat';
import { useAuthStore } from '@/store/useAuthStore';

interface TeamChatProps {
  teamId: number;
}

const TeamChat = ({ teamId }: TeamChatProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isConnected, sendMessage } = useTeamChat(teamId);
  const { user } = useAuthStore();

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
    <div className="flex flex-col w-full h-full rounded-xl shadow-lg border border-gray-200 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-base font-semibold text-gray-900">팀 채팅</h3>
            <p className="text-xs text-gray-500">팀원 4명</p>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-sm">아직 메시지가 없습니다</p>
            <p className="text-xs mt-1">첫 메시지를 보내보세요!</p>
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
                      <span className="text-xs font-medium text-gray-700 mb-1 px-1">
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
          </>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="px-3 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="메시지 보내기"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={!isConnected}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
          />
          <Button
            type="submit"
            icon={<Send className="w-5 h-5 rotate-45 -ml-1" />}
            className="p-y-2 rounded-full text-white shadow-md justify-center"
            noWrapper
          />
        </form>
      </div>
    </div>
  );
};

export default TeamChat;
