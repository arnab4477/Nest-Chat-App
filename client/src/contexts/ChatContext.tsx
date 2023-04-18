import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

// Interface for a message
export interface MessageType {
  sender: string;
  messageBody: string;
}

// Type for the all the chats
export type ChatType = MessageType[];

// Tyoe fir the ChatContext
type ChatContextType = [ChatType, Dispatch<SetStateAction<ChatType>> | null];

const ChatCTX = createContext<ChatContextType>([[], null]);

export const ChatContext = ({ children }) => {
  const ChatState = useState<ChatType>([]);

  return <ChatCTX.Provider value={ChatState}>{children}</ChatCTX.Provider>;
};

export const useChatState = () => useContext(ChatCTX);
