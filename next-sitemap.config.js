/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  alternateRefs: [
    {
      href: 'https://example.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://example.com/zh',
      hreflang: 'zh',
    },
  ],
  // 配置需要排除的路径
  exclude: ['/404'],
}
