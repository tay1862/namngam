export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/products/:path*', '/admin/blog/:path*', '/admin/faq/:path*', '/admin/settings/:path*', '/admin/subscribers/:path*'],
};
