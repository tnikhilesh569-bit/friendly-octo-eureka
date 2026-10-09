import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTTL(ttl: '5m' | '1h' | '24h'): number {
  const now = Date.now();
  if (ttl === '5m') return now + 5 * 60 * 1000;
  if (ttl === '1h') return now + 60 * 60 * 1000;
  return now + 24 * 60 * 60 * 1000;
}
