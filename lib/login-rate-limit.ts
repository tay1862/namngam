// Simple in-memory rate limiting for login attempts
// For production, consider using Redis or a database

interface LoginAttempt {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, LoginAttempt>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of loginAttempts.entries()) {
    if (now > value.resetTime && (!value.blockedUntil || now > value.blockedUntil)) {
      loginAttempts.delete(key);
    }
  }
}, 10 * 60 * 1000);

export function checkLoginRateLimit(identifier: string): { 
  allowed: boolean; 
  attemptsLeft?: number;
  blockedUntil?: Date;
  error?: string;
} {
  const now = Date.now();
  const record = loginAttempts.get(identifier);
  
  // Check if blocked
  if (record?.blockedUntil && now < record.blockedUntil) {
    const minutesLeft = Math.ceil((record.blockedUntil - now) / 60000);
    return {
      allowed: false,
      blockedUntil: new Date(record.blockedUntil),
      error: `ບັນຊີຖືກລັອກຊົ່ວຄາວ ລອງໃໝ່ໃນອີກ ${minutesLeft} ນາທີ`
    };
  }
  
  // Reset if time window passed
  if (!record || now > record.resetTime) {
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + 15 * 60 * 1000, // 15 minutes window
    });
    return { allowed: true, attemptsLeft: 4 };
  }
  
  // Increment attempts
  record.count++;
  
  // Block after 5 failed attempts
  if (record.count >= 5) {
    record.blockedUntil = now + 30 * 60 * 1000; // Block for 30 minutes
    return {
      allowed: false,
      blockedUntil: new Date(record.blockedUntil),
      error: 'ພະຍາຍາມເຂົ້າລະບົບຫຼາຍເກີນໄປ ບັນຊີຖືກລັອກ 30 ນາທີ'
    };
  }
  
  return { 
    allowed: true, 
    attemptsLeft: 5 - record.count 
  };
}

export function recordLoginSuccess(identifier: string): void {
  loginAttempts.delete(identifier);
}

export function recordLoginFailure(identifier: string): void {
  const now = Date.now();
  const record = loginAttempts.get(identifier);
  
  if (!record || now > record.resetTime) {
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + 15 * 60 * 1000,
    });
  } else {
    record.count++;
  }
}
