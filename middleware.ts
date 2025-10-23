import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

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
