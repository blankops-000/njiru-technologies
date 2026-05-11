import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Use mock if UPSTASH_REDIS_REST_URL is missing in dev
const getRedisClient = () => {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      return Redis.fromEnv();
    }
    // Simple mock for local dev without redis
    console.warn("UPSTASH_REDIS_REST_URL not found, using rate limit mock.");
    return {} as any;
  } catch (e) {
    return {} as any;
  }
};

const redis = getRedisClient();

// Only enable if redis is actually configured
const isEnabled = !!process.env.UPSTASH_REDIS_REST_URL;

const mockLimiter = {
  limit: async () => ({ success: true, limit: 100, remaining: 99, reset: Date.now() + 60000 }),
};

export const loginLimiter = isEnabled 
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '15 m'), analytics: true })
  : mockLimiter;

export const contactFormLimiter = isEnabled
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h'), analytics: true })
  : mockLimiter;

export const adminLimiter = isEnabled
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(100, '1 m'), analytics: true })
  : mockLimiter;
