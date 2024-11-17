import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - /.well-known
    // - favicon.ico, sitemap.xml, robots.txt
    '/((?!api|_next|static|.well-known|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
