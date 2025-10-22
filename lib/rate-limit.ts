import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter for API routes
export const apiLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

// Rate limiter for upload routes (stricter)
export const uploadLimiter = new RateLimiterMemory({
  points: 5, // 5 uploads
  duration: 300, // per 5 minutes
});

// Rate limiter for login attempts
export const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 900, // per 15 minutes
  blockDuration: 900, // block for 15 minutes
});

// Rate limiter for newsletter subscription
export const newsletterLimiter = new RateLimiterMemory({
  points: 3, // 3 subscriptions
  duration: 3600, // per hour
});

export async function checkRateLimit(
  limiter: RateLimiterMemory,
  key: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await limiter.consume(key);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'ທ່ານໃຊ້ງານບໍລິການບໍ່ຄົວເກີນກຳນົດ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ',
    };
  }
}
