/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize markdown content (allow basic markdown syntax)
 */
export function sanitizeMarkdown(input: string): string {
  if (!input) return '';
  
  // Remove script tags
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove iframe
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  // Remove on* event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
}

/**
 * Check for SQL injection patterns
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
    /(--|;|\/\*|\*\/)/,
    /(\bOR\b.*=.*|1=1|'=')/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate and sanitize input data
 */
export function validateInput(data: {
  email?: string;
  url?: string;
  text?: string;
  html?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (data.url && !isValidUrl(data.url)) {
    errors.push('Invalid URL format');
  }
  
  if (data.text && containsSqlInjection(data.text)) {
    errors.push('Invalid input detected');
  }
  
  if (data.html && containsSqlInjection(data.html)) {
    errors.push('Invalid input detected');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
