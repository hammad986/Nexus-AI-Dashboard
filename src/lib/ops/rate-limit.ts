import { logger } from './logger'

// In-memory rate limiting for serverless execution (best-effort, per-instance)
// In a real multi-region deployment, use Redis or Upstash KV.

const rateLimitStore = new Map<string, { count: number; expiresAt: number }>()

export interface RateLimitConfig {
  limit: number
  windowMs: number
}

export function checkRateLimit(ipOrId: string | null, action: string, config: RateLimitConfig): { success: boolean; limit: number; remaining: number; reset: number } {
  const key = `${action}:${ipOrId ?? 'anonymous'}`
  const now = Date.now()

  const record = rateLimitStore.get(key)
  
  if (!record || record.expiresAt < now) {
    rateLimitStore.set(key, { count: 1, expiresAt: now + config.windowMs })
    return { success: true, limit: config.limit, remaining: config.limit - 1, reset: now + config.windowMs }
  }

  record.count++
  rateLimitStore.set(key, record)

  if (record.count > config.limit) {
    logger.warn('Rate limit exceeded', { action, ip: ipOrId })
    return { success: false, limit: config.limit, remaining: 0, reset: record.expiresAt }
  }

  return { success: true, limit: config.limit, remaining: config.limit - record.count, reset: record.expiresAt }
}

export function aiRouteGuard(identifier: string | null) {
  // Standard AI route limits: 10 requests per minute per user/ip
  return checkRateLimit(identifier, 'ai_completion', { limit: 10, windowMs: 60_000 })
}

export function apiRouteGuard(identifier: string | null) {
  // Standard API limits: 60 requests per minute
  return checkRateLimit(identifier, 'api_request', { limit: 60, windowMs: 60_000 })
}
