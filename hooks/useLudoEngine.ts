import { useState } from 'react';
import { LudoGameState } from '@/types/ludo';

export function useLudoEngine() {
  const [gameState, setGameState] = useState<LudoGameState>({
    game_id: 'ludo-room-1',
    current_turn: 'red',
    dice_val: 1,
    is_rolling: false,
    pawn_positions: {
      red: [0, 0, 0, 0],
      green: [0, 0, 0, 0],
      yellow: [0, 0, 0, 0],
      blue: [0, 0, 0, 0],
    },
  });

  const rollDice = () => {
    if (gameState.is_rolling) return;
    setGameState((prev) => ({ ...prev, is_rolling: true }));

    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setGameState((prev) => ({
        ...prev,
        dice_val: val,
        is_rolling: false,
        pawn_positions: {
          ...prev.pawn_positions,
          [prev.current_turn]: prev.pawn_positions[prev.current_turn].map(
            (pos, i) => (i === 0 ? pos + val : pos)
          ),
        },
      }));
    }, 600);
  };

  return { gameState, rollDice };
}
