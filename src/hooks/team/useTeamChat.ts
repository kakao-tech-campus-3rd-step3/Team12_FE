import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { WS_BASE_URL, TEAM_ENDPOINTS } from '@/apis/constants/endpoints';

interface Message {
  id: number;
  teamId: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
}

interface NewMessageResponse {
  type: 'NEW_MESSAGE';
  data: Message;
}

interface ErrorResponse {
  type: 'ERROR';
  message: string;
}

type WebSocketMessage = NewMessageResponse | ErrorResponse;

export const useTeamChat = (teamId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { accessToken } = useAuthStore();

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
      } else if (message.type == 'ERROR') {
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
  }, [teamId, accessToken]);

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
  };
};
