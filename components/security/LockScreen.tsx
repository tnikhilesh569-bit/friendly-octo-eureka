import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { ClayButton } from '../ui/ClayButton';

interface LockScreenProps {
  onUnlock: (pin: string) => boolean;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    const success = onUnlock(pin);
    if (!success) {
      alert('Invalid Lock PIN! (Master: 1234 | Decoy: 9999)');
    }
    setPin('');
  };

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center mb-4 clay-btn">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Glass Application Lock</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">Enter PIN code to decrypt workspace</p>

        <input 
          type="password" 
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          className="w-full text-center text-2xl tracking-widest font-mono bg-slate-100 border border-slate-200 rounded-2xl py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />

        <ClayButton onClick={handleSubmit} className="w-full py-3.5">
          Unlock Workspace
        </ClayButton>
        <p className="text-[10px] text-slate-400 mt-4">Protected by Ephemeral Dual PIN Security</p>
      </div>
    </div>
  );
};
