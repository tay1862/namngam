import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Security headers
    const response = NextResponse.next();
    
    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY');
    
    // XSS Protection
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    // Referrer Policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy (basic)
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
    );
    
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/products/:path*',
    '/admin/blog/:path*',
    '/admin/faq/:path*',
    '/admin/settings/:path*',
    '/admin/subscribers/:path*',
    '/admin/about/:path*',
    '/admin/benefits/:path*',
  ],
};
