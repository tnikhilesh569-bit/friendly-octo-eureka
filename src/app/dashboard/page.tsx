'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { GlassCard } from '@/components/ui/GlassCard';

export default function DashboardPage() {
  const activeChatId = useChatStore((state) => state.activeChatId) || 'general';
  const messages = useChatStore((state) => state.messages[activeChatId]) || [
    {
      id: '1',
      senderId: 'lumi-ai',
      text: 'Welcome to Lumi Luxury Communication. How may I assist your exquisite conversation today?',
      timestamp: '10:00 AM',
    },
  ];
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addMessage(activeChatId, newMessage);

    // Simulate AI or peer response
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        senderId: 'lumi-ai',
        text: `Echoing your elegance: "${text}" has been securely recorded.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addMessage(activeChatId, aiReply);
    }, 1000);
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-2xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <GlassCard className="flex items-center justify-between mb-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full neumorphic-card-inset flex items-center justify-center text-[#D49B86] font-bold">
            L
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#4A3B32]">Lumi Secure Lounge</h2>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> End-to-End Encrypted
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 my-2 pr-1">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            senderName={msg.senderId === 'me' ? 'You' : 'Lumi AI Assistant'}
            timestamp={msg.timestamp}
            isMe={msg.senderId === 'me'}
            mediaUrl={msg.mediaUrl}
          />
        ))}
      </div>

      {/* Chat Input & Navigation */}
      <ChatInput onSendMessage={handleSendMessage} onAttachMedia={() => alert('Media attachment modal triggered.')} />
      <NavigationBar />
    </main>
  );
}
