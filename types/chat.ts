export interface Message {
  id?: string;
  content: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
  reply_to?: string | null;
  reactions?: Record<string, number>;
  expires_at?: string;
}

export type TTLOption = '5m' | '1h' | '24h';
