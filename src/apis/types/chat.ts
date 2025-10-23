export interface ChatMessage {
  id: number;
  teamId: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
}

// 채팅 메세지 조회 요청
export interface GetChatMessagesRequest {
  teamId: number;
  cursor?: number;
}

// 채팅 메세지 조회
export interface GetChatMessagesResponse {
  messages: ChatMessage[];
  hasNext: boolean;
  nextCursor: number | null;
}
