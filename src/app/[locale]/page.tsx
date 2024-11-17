import { Metadata } from 'next'
import { getServerTranslator } from '@/i18n/server'
import { locales } from '@/i18n/config'
import { getAllProducts, getAllBlogPosts } from '@/lib/content'
import ProductHighlight from '@/components/ProductHighlight'
import BlogPreview from '@/components/BlogPreview'
import InquiryForm from '@/components/InquiryForm'
import FAQ from '@/components/FAQ'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslator(params.locale as any)
  
  // 生成所有语言的替代链接
  const alternateUrls = locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}`
    return acc
  }, {} as Record<string, string>)

  return {
    title: t('Metadata.Home.title'),
    description: t('Metadata.Home.description'),
    alternates: {
      canonical: `/${params.locale}`,
      languages: alternateUrls,
    },
    openGraph: {
      title: t('Metadata.Home.title'),
      description: t('Metadata.Home.description'),
      type: 'website',
      locale: params.locale,
      alternateLocale: locales.filter(l => l !== params.locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('Metadata.Home.title'),
      description: t('Metadata.Home.description'),
    },
  }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function HomePage({ params }: Props) {
  const { t } = await getServerTranslator(params.locale as any)
  const products = await getAllProducts(params.locale)
  const posts = await getAllBlogPosts(params.locale)

  return (
    <main className="min-h-screen">
      {/* 欢迎界面 */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            {t('Home.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {t('Home.heroSubtitle')}
          </p>
          <a
            href="#products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t('Home.heroCta')}
          </a>
        </div>
      </section>

      {/* 产品展示 */}
      <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('Home.featuredProducts')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('Home.featuredProductsDescription')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductHighlight 
                key={product.id} 
                product={product}
                locale={params.locale}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors"
            >
              {t('Home.featuredProductsViewAll')}
            </a>
          </div>
        </div>
      </section>

      {/* 博客预览 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('Home.latestBlog')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('Home.latestBlogDescription')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogPreview 
                key={post.slug} 
                post={post}
                locale={params.locale}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-block border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors"
            >
              {t('Home.latestBlogViewAll')}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ部分 */}
      <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('Home.faqTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('Home.faqDescription')}</p>
          <FAQ />
        </div>
      </section>

      {/* 询单表单 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('Home.contactTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('Home.contactDescription')}</p>
          <InquiryForm />
        </div>
      </section>
    </main>
  )
}
