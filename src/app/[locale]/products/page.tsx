import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/lib/content'
import { locales } from '@/i18n/config'

const defaultProductImage = '/images/defaults/default-product.jpg'  // 确保这个文件存在

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('Products')
  
  // 生成所有语言的替代链接
  const alternateUrls = locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}/products`
    return acc
  }, {} as Record<string, string>)

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `/${params.locale}/products`,
      languages: alternateUrls,
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      type: 'website',
      locale: params.locale,
      alternateLocale: locales.filter(l => l !== params.locale),
    },
  }
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
  ]
}

interface Props {
  params: {
    locale: string
  }
}

export default async function ProductsPage({ params }: Props) {
  setRequestLocale(params.locale)
  const t = await getTranslations('Products')
  const products = await getAllProducts(params.locale)

  // 处理图片路径，确保使用正确的格式
  const getImagePath = (imagePath: string | undefined) => {
    if (!imagePath) return defaultProductImage
    // 直接返回图片路径，因为它已经是正确的格式了
    return imagePath
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('pageTitle')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/${params.locale}/products/${product.id}`}
            className="group"
          >
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={getImagePath(product.image)}
                alt={product.name}
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}