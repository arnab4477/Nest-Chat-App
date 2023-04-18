import axios from 'axios';
import { ChatType, MessageType, UserType } from './contexts';

const BASE_URL = 'http://localhost:8080';

export const getAllMessages = async (): Promise<ChatType> => {
  const response = await axios.get(`${BASE_URL}/messages`);
  const messages = response.data as ChatType;

  return messages;
};

export const sendMessage = async (message: MessageType): Promise<void> => {
  await axios.post(`${BASE_URL}/messages`, message);
};

export const registerUser = async (user: {
  name: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, user);
  return response.data as UserType;
};

export const authenticateUser = async (user: {
  name: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user);
  return response.data as UserType;
};
