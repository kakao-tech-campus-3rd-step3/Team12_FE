import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { WS_BASE_URL, TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import { chatAPI } from '@/apis/services/chat';
import type { ChatMessage } from '@/apis/types/chat';

interface NewMessageResponse {
  type: 'NEW_MESSAGE';
  data: ChatMessage;
}

interface ErrorResponse {
  type: 'ERROR';
  message: string;
}

type WebSocketMessage = NewMessageResponse | ErrorResponse;

//메세지 시간순 정렬
const sortMessagesByTime = (messages: ChatMessage[]): ChatMessage[] => {
  return [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

export const useTeamChat = (teamId: number, isChatOpen: boolean = false) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [unReadCount, setUnReadCount] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const { accessToken, user } = useAuthStore();
  const isInitialLoadRef = useRef(true);
  const isChatOpenRef = useRef(isChatOpen);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  //초기 메세지 조회
  const loadInitialMessages = useCallback(async () => {
    if (!teamId) return;

    setIsLoadingMessages(true);
    try {
      const response = await chatAPI.getChatMessages({ teamId });
      const sortedMessages = sortMessagesByTime(response.messages);
      setMessages(sortedMessages);
      setHasMore(response.hasNext);
      setNextCursor(response.nextCursor);

      const lastReadId = localStorage.getItem(`team_${teamId}_lastRead`);
      if (lastReadId && user?.user_id) {
        const unreadMessages = sortedMessages.filter(
          (msg) => msg.id > Number(lastReadId) && String(msg.senderId) !== String(user.user_id),
        );
        setUnReadCount(unreadMessages.length);
      }
    } catch (error) {
      console.error('메세지 불러오기 실패', error);
    } finally {
      setIsLoadingMessages(false);
      isInitialLoadRef.current = false;
    }
  }, [teamId, user]);

  //추가 메세지 조회 - 무한 스크롤
  const loadMoreMessages = useCallback(async () => {
    if (!teamId || !hasMore || isLoadingMessages || nextCursor === null) return;

    setIsLoadingMessages(true);
    try {
      const response = await chatAPI.getChatMessages({ teamId, cursor: nextCursor });
      const sortedMessages = sortMessagesByTime(response.messages);

      setMessages((prev) => [...sortedMessages, ...prev]);
      setHasMore(response.hasNext);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error('메세지 로드 실패', error);
    } finally {
      setIsLoadingMessages(false);
    }
  }, [teamId, hasMore, isLoadingMessages, nextCursor]);

  //채팅창 open -> 초기 메세지 조회
  useEffect(() => {
    if (isInitialLoadRef.current) {
      loadInitialMessages();
    }
  }, [loadInitialMessages]);

  //웹소켓 연결
  useEffect(() => {
    if (!teamId || !accessToken) {
      console.log('웹소켓 연결 불가: teamId or accessToken 없음', {
        teamId,
        hasToken: !!accessToken,
      });
      return;
    }

    const wsPath = TEAM_ENDPOINTS.CHAT_WEBSOCKET(teamId, accessToken);
    const wsUrl = `${WS_BASE_URL}${wsPath}`;

    console.log('웹소켓 연결 시도:', wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('웹소켓 연결 성공');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);

      if (message.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, message.data]);

        const isMyMessage = user?.user_id
          ? String(message.data.senderId) === String(user.user_id)
          : false;

        if (!isMyMessage) {
          if (isChatOpenRef.current) {
            const lastMessageId = message.data.id;
            localStorage.setItem(`team_${teamId}_lastRead`, String(lastMessageId));
            setUnReadCount(0);
          } else {
            setUnReadCount((prev) => prev + 1);
          }
        }
      } else if (message.type === 'ERROR') {
        console.error('서버 에러', message.message);
      }
    };

    ws.onerror = (error) => {
      console.error('웹소켓 에러:', error);
      console.error('웹소켓 URL:', wsUrl);
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log('웹소켓 연결 종료:', { code: event.code, reason: event.reason });
      setIsConnected(false);
    };

    wsRef.current = ws;

    //웹소켓 연결 해제
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
    };
  }, [teamId, accessToken, user]);

  const markAsRead = useCallback(() => {
    if (messages.length > 0) {
      const lastMessageId = messages[messages.length - 1].id;
      localStorage.setItem(`team_${teamId}_lastRead`, String(lastMessageId));
      console.log('읽음 처리:', lastMessageId);
    }

    setUnReadCount(0);
  }, [messages, teamId]);

  //메세지 전송
  const sendMessage = useCallback((content: string) => {
    //웹소켓 연결 확인
    if (!wsRef.current || wsRef.current.readyState != WebSocket.OPEN) {
      console.error('웹 소켓 연결 X');
      return;
    }

    const message = { type: 'SEND_MESSAGE', content };

    wsRef.current.send(JSON.stringify(message));
  }, []);

  return {
    messages,
    isConnected,
    sendMessage,
    loadMoreMessages,
    isLoadingMessages,
    hasMore,
    unReadCount,
    markAsRead,
  };
};
