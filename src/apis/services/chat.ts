import { apiClient } from '@/apis/client/apiClients';
import { TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import type { GetChatMessagesRequest, GetChatMessagesResponse } from '@/apis/types/chat';

export const chatAPI = {
  getChatMessages: ({
    teamId,
    cursor,
  }: GetChatMessagesRequest): Promise<GetChatMessagesResponse> => {
    const params = cursor ? { cursor } : {};
    return apiClient
      .get(TEAM_ENDPOINTS.CHAT_MESSAGES(teamId), { params })
      .then((response) => response.data);
  },
};
