import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import InquiryForm from '@/components/InquiryForm'
import ProductHighlight from '@/components/ProductHighlight'
import BlogPreview from '@/components/BlogPreview'
import FAQ from '@/components/FAQ'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Home')
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function Home() {
  const t = useTranslations('Home')

  return (
    <main className="min-h-screen">
      {/* 欢迎界面 */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {t('hero.description')}
          </p>
          <a
            href="#products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* 产品展示 */}
      <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">{t('products.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('products.description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductHighlight />
          </div>
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors"
            >
              {t('products.viewAll')}
            </a>
          </div>
        </div>
      </section>

      {/* 博客预览 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">{t('blog.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('blog.description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogPreview />
          </div>
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-block border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors"
            >
              {t('blog.viewAll')}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ部分 */}
      <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">{t('faq.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('faq.description')}</p>
          <FAQ />
        </div>
      </section>

      {/* 询单表单 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">{t('inquiry.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('inquiry.description')}</p>
          <InquiryForm />
        </div>
      </section>
    </main>
  )
}
