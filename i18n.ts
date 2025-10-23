import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['lo', 'th', 'en', 'zh'] as const;
export const defaultLocale = 'lo' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async (params) => {
  const locale = params.locale as Locale;
  
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
