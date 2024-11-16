import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import InquiryForm from '@/components/InquiryForm'

interface Props {
  params: {
    id: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('Products')
  const productId = parseInt(params.id)
  
  if (productId < 1 || productId > 3) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: t(`product${productId}.name`),
    description: t(`product${productId}.description`),
    openGraph: {
      title: t(`product${productId}.name`),
      description: t(`product${productId}.description`),
      type: 'product',
    },
  }
}

export default function ProductPage({ params }: Props) {
  const t = useTranslations('Products')
  const productId = parseInt(params.id)

  if (productId < 1 || productId > 3) {
    notFound()
  }

  const product = {
    id: productId,
    name: t(`product${productId}.name`),
    description: t(`product${productId}.description`),
    features: t(`product${productId}.features`).split('|'),
    specifications: t(`product${productId}.specifications`).split('|'),
    image: `/images/product${productId}.jpg`,
  }

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* 产品详情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {product.description}
            </p>
            
            <h2 className="text-xl font-semibold mb-4">{t('features')}</h2>
            <ul className="list-disc list-inside mb-8 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-4">{t('specifications')}</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.specifications.map((spec, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 询单表单 */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            {t('inquiryTitle')}
          </h2>
          <InquiryForm />
        </div>
      </div>
    </main>
  )
}
