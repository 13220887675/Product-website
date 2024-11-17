import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // 如果访问根路径，重定向到默认语言
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*']
};
