import React, { useState } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onAttachMedia?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onAttachMedia }) => {
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSend} className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#FDF8F5] p-3 rounded-2xl flex items-center gap-3 neumorphic-card z-40">
      {/* Media Attachment Button */}
      {onAttachMedia && (
        <button
          type="button"
          onClick={onAttachMedia}
          className="p-3 text-[#8C7A70] hover:text-[#4A3B32] transition-colors rounded-xl neumorphic-card-inset flex items-center justify-center"
          title="Attach Media"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
      )}

      {/* Input Field */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a luxurious message..."
        className="flex-1 bg-[#FDF8F5] text-[#4A3B32] placeholder-[#8C7A70] px-4 py-3 rounded-xl outline-none neumorphic-card-inset text-sm"
      />

      {/* Send Button */}
      <button
        type="submit"
        className="px-5 py-3 neumorphic-button text-[#4A3B32] rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
};
