'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CustomButton } from '@/components/ui/CustomButton';
import { NavigationBar } from '@/components/ui/NavigationBar';

export default function StatusPage() {
  const [statusText, setStatusText] = useState('');
  const [stories, setStories] = useState([
    { id: '1', user: 'Nikhil Tiwari', text: 'Enjoying the exquisite luxury design of Lumi.', time: '2 hours ago' },
    { id: '2', user: 'Companion', text: 'Securing all communication channels with end-to-end encryption.', time: '5 hours ago' },
  ]);

  const handlePostStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusText.trim()) return;

    const newStory = {
      id: Date.now().toString(),
      user: 'You',
      text: statusText,
      time: 'Just now',
    };

    setStories([newStory, ...stories]);
    setStatusText('');
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <GlassCard className="py-4">
        <h1 className="text-xl font-bold text-[#4A3B32]">Stories & Status</h1>
        <p className="text-xs text-[#8C7A70]">Share fleeting moments that vanish in 24 hours</p>
      </GlassCard>

      {/* Post New Status */}
      <GlassCard>
        <form onSubmit={handlePostStory} className="flex flex-col gap-4">
          <textarea
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
            placeholder="What's on your mind? (AI enhanced)"
            className="w-full p-4 bg-[#FDF8F5] text-[#4A3B32] placeholder-[#8C7A70] rounded-xl outline-none neumorphic-card-inset text-sm resize-none h-24"
          />
          <CustomButton type="submit" variant="primary">
            Post 24h Story
          </CustomButton>
        </form>
      </GlassCard>

      {/* Stories Feed */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-[#4A3B32] uppercase tracking-wider">Active Stories</h2>
        {stories.map((story) => (
          <GlassCard key={story.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#4A3B32]">{story.user}</span>
              <span className="text-[10px] text-[#8C7A70]">{story.time}</span>
            </div>
            <p className="text-sm text-[#4A3B32] leading-relaxed">{story.text}</p>
          </GlassCard>
        ))}
      </div>

      <NavigationBar />
    </main>
  );
}
