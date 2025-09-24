import axios from 'axios';
import { API_BASE_URL } from '@/apis/constants/endpoints';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
