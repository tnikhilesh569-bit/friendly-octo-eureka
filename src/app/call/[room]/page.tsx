'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { CustomButton } from '@/components/ui/CustomButton';

export default function CallRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomName = (params?.room as string) || 'lumi-secure-room';

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleEndCall = () => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-[#F7F0EC] p-4 flex flex-col justify-between max-w-4xl mx-auto">
      {/* Header Info */}
      <GlassCard className="flex items-center justify-between py-3">
        <div>
          <h2 className="text-sm font-semibold text-[#4A3B32]">Secure Call Room: {roomName}</h2>
          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> WebRTC End-to-End Encrypted
          </span>
        </div>
      </GlassCard>

      {/* Video Grid Placeholder */}
      <div className="flex-1 my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remote Participant Stream */}
        <div className="w-full h-72 md:h-full rounded-2xl neumorphic-card-inset flex items-center justify-center relative overflow-hidden bg-[#EFE4DE]">
          <div className="w-20 h-20 rounded-full neumorphic-card flex items-center justify-center text-[#D49B86] text-2xl font-bold">
            P
          </div>
          <span className="absolute bottom-4 left-4 text-xs font-medium text-[#4A3B32] bg-[#FDF8F5]/80 px-3 py-1 rounded-lg">
            Companion (Secure Stream)
          </span>
        </div>

        {/* Local Self Stream */}
        <div className="w-full h-72 md:h-full rounded-2xl neumorphic-card-inset flex items-center justify-center relative overflow-hidden bg-[#EFE4DE]">
          {isVideoOff ? (
            <div className="text-xs text-[#8C7A70]">Camera is turned off</div>
          ) : (
            <div className="w-20 h-20 rounded-full neumorphic-card flex items-center justify-center text-[#4A3B32] text-2xl font-bold">
              You
            </div>
          )}
          <span className="absolute bottom-4 left-4 text-xs font-medium text-[#4A3B32] bg-[#FDF8F5]/80 px-3 py-1 rounded-lg">
            You (Encrypted Feed)
          </span>
        </div>
      </div>

      {/* Call Controls Bar */}
      <GlassCard className="flex items-center justify-center gap-4 py-4">
        {/* Mute Audio */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-xl transition-all ${isMuted ? 'neumorphic-card-inset text-red-500' : 'neumorphic-card text-[#4A3B32]'}`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {/* Toggle Video */}
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-4 rounded-xl transition-all ${isVideoOff ? 'neumorphic-card-inset text-red-500' : 'neumorphic-card text-[#4A3B32]'}`}
          title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>

        {/* End Call */}
        <button
          onClick={handleEndCall}
          className="px-6 py-4 bg-red-500 text-white rounded-xl font-medium shadow-[6px_6px_12px_#d0a696,-6px_-6px_12px_#ffdac0] hover:bg-red-600 transition-all flex items-center gap-2"
        >
          End Call
        </button>
      </GlassCard>
    </main>
  );
}
