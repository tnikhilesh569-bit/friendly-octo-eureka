import { create } from 'zustand';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  mediaUrl?: string;
}

interface ChatState {
  activeChatId: string | null;
  messages: Record<string, Message[]>;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  messages: {},
  setActiveChat: (chatId) => set({ activeChatId: chatId }),
  addMessage: (chatId, message) =>
    set((state) => {
      const chatMessages = state.messages[chatId] || [];
      return {
        messages: {
          ...state.messages,
          [chatId]: [...chatMessages, message],
        },
      };
    }),
}));
