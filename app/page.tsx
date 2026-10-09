'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useDecoyLock } from '@/hooks/useDecoyLock';
import { LockScreen } from '@/components/security/LockScreen';
import { LudoBoard } from '@/components/arcade/LudoBoard';
import { ClayButton } from '@/components/ui/ClayButton';
import { Message, TTLOption } from '@/types/chat';
import { QRCodeSVG } from 'qrcode.react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { 
  Phone, Video, Send, QrCode, Shield, Lock, 
  Gamepad2, Reply, X, Flame 
} from 'lucide-react';

export default function MasterGlassApp() {
  const { isLocked, isDecoyMode, unlock, lock } = useDecoyLock();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [selectedTTL, setSelectedTTL] = useState<TTLOption>('24h');
  
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [callToken, setCallToken] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [showLudo, setShowLudo] = useState(false);

  const username = isDecoyMode ? 'guest_user' : 'nikhil_t';

  useEffect(() => {
    if (isLocked || isDecoyMode) return;

    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLocked, isDecoyMode]);

  if (isLocked) {
    return <LockScreen onUnlock={unlock} />;
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      content: inputText,
      sender_id: isDecoyMode ? 'decoy-id' : 'user-nikhil',
      sender_name: username,
      created_at: new Date().toISOString(),
      reply_to: replyTarget ? replyTarget.content : null,
      reactions: {},
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setReplyTarget(null);

    if (!isDecoyMode) {
      await supabase.from('messages').insert([newMsg]);
    }
  };

  const addReaction = (msgIdx: number, emoji: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      const currentReactions = updated[msgIdx].reactions || {};
      currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
      updated[msgIdx].reactions = currentReactions;
      return updated;
    });
  };

  const startCall = async (roomName: string) => {
    try {
      const res = await fetch(`/api/livekit?room=${roomName}&username=${username}`);
      const data = await res.json();
      setCallToken(data.token);
      setActiveCall(roomName);
    } catch (e) {
      console.error('Call connection error:', e);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-white/70 backdrop-blur-xl border-r p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {isDecoyMode ? 'GU' : 'NT'}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{isDecoyMode ? 'Guest User' : 'Nikhil Tiwari'}</h3>
                <p className="text-xs text-slate-400">@{username}</p>
              </div>
            </div>
            <ClayButton variant="glass" onClick={() => setShowQR(!showQR)} className="p-2">
              <QrCode className="w-4 h-4" />
            </ClayButton>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                {isDecoyMode ? 'SB' : 'NP'}
              </div>
              <div>
                <h4 className="text-xs font-semibold">{isDecoyMode ? 'System Bot' : 'Neet Prep Hub'}</h4>
                <p className="text-[10px] text-slate-400">Ephemeral Active</p>
              </div>
            </div>
            <span className="flex items-center text-[10px] font-bold text-amber-500 gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-amber-500" /> {isDecoyMode ? '1' : '14'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <ClayButton variant="glass" onClick={lock} className="w-full">
            <Lock className="w-3.5 h-3.5" /> Lock Application
          </ClayButton>
          <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-2xl text-xs text-slate-500 border border-slate-200/50">
            <Shield className={`w-4 h-4 ${isDecoyMode ? 'text-amber-500' : 'text-emerald-600'}`} />
            <span>{isDecoyMode ? 'Decoy Mode Active' : '24h Encrypted Mode'}</span>
          </div>
        </div>
      </aside>

      {/* CHAT & GAME WORKSPACE */}
      <main className="flex-1 flex flex-col justify-between relative">
        
        {/* HEADER */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="font-semibold text-sm">{isDecoyMode ? 'System Support Chat' : 'Neet Prep Study Hub'}</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-500 gap-1">
              {(['5m', '1h', '24h'] as const).map((ttl) => (
                <button
                  key={ttl}
                  onClick={() => setSelectedTTL(ttl)}
                  className={`px-2 py-0.5 rounded-lg transition-all ${selectedTTL === ttl ? 'bg-white text-indigo-600 shadow-sm' : ''}`}
                >
                  {ttl}
                </button>
              ))}
            </div>

            <ClayButton variant="warning" onClick={() => setShowLudo(!showLudo)}>
              <Gamepad2 className="w-4 h-4" /> Ludo Arcade
            </ClayButton>
            <ClayButton variant="glass" onClick={() => startCall('neet-study-room')}><Phone className="w-4 h-4" /></ClayButton>
            <ClayButton onClick={() => startCall('neet-study-room')}><Video className="w-4 h-4" /></ClayButton>
          </div>
        </header>

        {/* MESSAGES / GAME CONTAINER */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 relative">
          {showLudo && <LudoBoard onClose={() => setShowLudo(false)} />}

          {messages.map((msg, idx) => (
            <div key={idx} className="flex flex-col items-end group">
              {msg.reply_to && (
                <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-t-xl border-l-2 border-indigo-500 mb-0.5">
                  Replying to: "{msg.reply_to}"
                </div>
              )}
              <div className="relative bg-indigo-600 text-white px-4 py-2.5 rounded-3xl rounded-tr-sm text-sm shadow-md">
                {msg.content}
                {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                  <div className="absolute -bottom-2 -left-2 bg-white text-slate-800 px-2 py-0.5 rounded-full text-[10px] shadow border flex gap-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <span key={emoji}>{emoji} {count}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => setReplyTarget(msg)} className="text-[10px] text-slate-400 hover:text-indigo-600 flex items-center gap-0.5">
                  <Reply className="w-3 h-3" /> Reply
                </button>
                <button onClick={() => addReaction(idx, '❤️')} className="text-[10px] text-slate-400">❤️</button>
                <button onClick={() => addReaction(idx, '🔥')} className="text-[10px] text-slate-400">🔥</button>
                <span className="text-[10px] text-slate-300">Purges in {selectedTTL}</span>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT DOCK */}
        <footer className="p-4 bg-white/70 backdrop-blur-md border-t">
          {replyTarget && (
            <div className="max-w-4xl mx-auto mb-2 p-2 bg-indigo-50 border-l-4 border-indigo-600 rounded flex justify-between items-center text-xs text-slate-600">
              <span>Replying to: <b>{replyTarget.content}</b></span>
              <button onClick={() => setReplyTarget(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
          )}

          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Type a message... (Auto-clears in ${selectedTTL})`}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <ClayButton onClick={sendMessage}><Send className="w-4 h-4" /></ClayButton>
          </div>
        </footer>

        {/* LIVEKIT CALL OVERLAY */}
        {activeCall && callToken && (
          <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-2xl flex flex-col">
            <div className="p-4 flex justify-between items-center text-white">
              <h3 className="font-semibold text-sm">Active Room: {activeCall}</h3>
              <button onClick={() => setActiveCall(null)} className="px-4 py-2 bg-rose-600 rounded-xl text-xs font-bold">
                End Call
              </button>
            </div>
            <div className="flex-1">
              <LiveKitRoom serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} token={callToken} connect={true} data-lk-theme="default">
                <VideoConference />
              </LiveKitRoom>
            </div>
          </div>
        )}

        {/* QR MODAL */}
        {showQR && (
          <div className="absolute inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center max-w-xs text-center">
              <h3 className="font-bold text-slate-800 mb-1">Direct Chat QR</h3>
              <div className="p-4 bg-white rounded-2xl border shadow-inner my-4">
                <QRCodeSVG value={`https://glasschatapp.vercel.app/m/${username}`} size={160} />
              </div>
              <ClayButton onClick={() => setShowQR(false)} className="w-full">Close</ClayButton>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
