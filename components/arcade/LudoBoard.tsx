import React from 'react';
import { Dices, X } from 'lucide-react';
import { useLudoEngine } from '@/hooks/useLudoEngine';
import { ClayButton } from '../ui/ClayButton';

interface LudoBoardProps {
  onClose: () => void;
}

export const LudoBoard: React.FC<LudoBoardProps> = ({ onClose }) => {
  const { gameState, rollDice } = useLudoEngine();

  return (
    <div className="absolute inset-4 z-30 bg-white/95 backdrop-blur-2xl rounded-3xl border border-white shadow-2xl p-6 flex flex-col items-center justify-between">
      <div className="w-full flex justify-between items-center pb-2 border-b">
        <div className="flex items-center gap-2">
          <Dices className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-sm text-slate-800">Glass Ludo Arcade 1v1</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="w-64 h-64 bg-slate-100 border-2 border-indigo-200 rounded-3xl grid grid-cols-3 gap-1 p-2 relative shadow-inner">
        <div className="bg-rose-200 rounded-2xl flex items-center justify-center font-bold text-rose-600 text-xs">RED</div>
        <div className="bg-indigo-100 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-xs">PATH</div>
        <div className="bg-emerald-200 rounded-2xl flex items-center justify-center font-bold text-emerald-600 text-xs">GREEN</div>
        <div className="bg-indigo-100 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-xs">PATH</div>
        <div className="bg-amber-300 rounded-2xl flex items-center justify-center font-bold text-amber-800 text-xs">HOME</div>
        <div className="bg-indigo-100 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-xs">PATH</div>
        <div className="bg-sky-200 rounded-2xl flex items-center justify-center font-bold text-sky-600 text-xs">BLUE</div>
        <div className="bg-indigo-100 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-xs">PATH</div>
        <div className="bg-amber-200 rounded-2xl flex items-center justify-center font-bold text-amber-600 text-xs">YELLOW</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-500">
          Red Pawn Move: <span className="font-bold text-indigo-600">{gameState.pawn_positions.red[0]}</span>
        </div>
        <ClayButton 
          variant="warning" 
          onClick={rollDice} 
          className={gameState.is_rolling ? 'animate-spin' : ''}
        >
          <Dices className="w-5 h-5" /> Roll Dice: {gameState.dice_val}
        </ClayButton>
      </div>
    </div>
  );
};
