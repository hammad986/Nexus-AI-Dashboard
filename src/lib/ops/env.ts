import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // Add more enterprise-grade environment variables here as needed
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  DATADOG_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DATADOG_API_KEY: process.env.DATADOG_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});
