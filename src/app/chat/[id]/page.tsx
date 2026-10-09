'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useChatStore } from '@/store/useChatStore';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = (params?.id as string) || 'general';
  
  const { setActiveChat, messages, addMessage } = useChatStore();

  useEffect(() => {
    if (chatId) {
      setActiveChat(chatId);
    }
  }, [chatId, setActiveChat]);

  const chatMessages = messages[chatId] || [
    {
      id: '1',
      senderId: 'peer',
      text: 'Welcome to this secure luxury chat room. All messages are end-to-end encrypted.',
      timestamp: '10:00 AM',
    },
  ];

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addMessage(chatId, newMessage);

    // Simulate peer/AI response
    setTimeout(() => {
      const peerReply = {
        id: (Date.now() + 1).toString(),
        senderId: 'peer',
        text: `Received: "${text}". Very exquisite!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addMessage(chatId, peerReply);
    }, 1200);
  };

  return (
    <main className="min-h-screen pb-28 pt-4 px-4 max-w-2xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <GlassCard className="flex items-center justify-between mb-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-xl neumorphic-card text-[#4A3B32] hover:text-[#D49B86] transition-all"
            title="Back to Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-semibold text-[#4A3B32]">Chat Room: {chatId}</h2>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Secure Connection
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 my-2 pr-1">
        {chatMessages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            senderName={msg.senderId === 'me' ? 'You' : 'Companion'}
            timestamp={msg.timestamp}
            isMe={msg.senderId === 'me'}
            mediaUrl={msg.mediaUrl}
          />
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} onAttachMedia={() => alert('Media uploaded securely via Cloudinary.')} />
    </main>
  );
}
