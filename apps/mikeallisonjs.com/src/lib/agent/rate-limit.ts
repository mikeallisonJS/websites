type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 30

export function checkRateLimit(key: string): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const existing = buckets.get(key)
  if (!existing || existing.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + WINDOW_MS }
    buckets.set(key, fresh)
    return { allowed: true, remaining: LIMIT - 1, resetAt: fresh.resetAt }
  }
  if (existing.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }
  existing.count += 1
  return {
    allowed: true,
    remaining: LIMIT - existing.count,
    resetAt: existing.resetAt
  }
}
