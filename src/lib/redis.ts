import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper for ultra-fast caching
export const setCache = async (key: string, value: any, expSeconds = 3600) => {
  await redis.set(key, JSON.stringify(value), { ex: expSeconds });
};

export const getCache = async (key: string) => {
  const data = await redis.get(key);
  return data ? (typeof data === 'string' ? JSON.parse(data) : data) : null;
};
