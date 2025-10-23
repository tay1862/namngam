import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // ปล่อยให้ทุก request ผ่านไปยัง pages โดยตรง
  // ไม่ใช้ next-intl routing (ใช้เฉพาะ translations)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - admin routes  
    // - _next static files
    // - _vercel files
    // - files with extensions
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
};
