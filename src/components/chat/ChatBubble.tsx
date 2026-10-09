import React from 'react';

interface ChatBubbleProps {
  message: string;
  senderName: string;
  timestamp: string;
  isMe: boolean;
  mediaUrl?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  senderName,
  timestamp,
  isMe,
  mediaUrl,
}) => {
  return (
    <div className={`flex flex-col my-2 ${isMe ? 'items-end' : 'items-start'}`}>
      <span className="text-xs text-[#8C7A70] mb-1 px-1">{senderName}</span>
      <div
        className={`max-w-[75%] p-4 rounded-2xl transition-all duration-200 ${
          isMe
            ? 'bg-[#E2B8A8] text-[#4A3B32] rounded-br-none shadow-[6px_6px_12px_#d0a696,-6px_-6px_12px_#ffdac0]'
            : 'bg-[#FDF8F5] text-[#4A3B32] rounded-bl-none neumorphic-card'
        }`}
      >
        {mediaUrl && (
          <div className="mb-2 overflow-hidden rounded-xl">
            <img src={mediaUrl} alt="Shared media" className="w-full h-auto object-cover max-h-60" />
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <span className={`block text-[10px] mt-1 text-right ${isMe ? 'text-[#4A3B32]/70' : 'text-[#8C7A70]'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};
