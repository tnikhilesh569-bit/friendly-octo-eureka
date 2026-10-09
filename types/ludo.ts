export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface LudoGameState {
  game_id: string;
  current_turn: PlayerColor;
  dice_val: number;
  is_rolling: boolean;
  pawn_positions: Record<PlayerColor, number[]>;
}
