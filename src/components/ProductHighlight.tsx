import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function ProductHighlight() {
  const t = useTranslations('Products')

  const products = [
    {
      id: 1,
      name: t('product1.name'),
      description: t('product1.description'),
      image: '/images/product1.jpg',
    },
    {
      id: 2,
      name: t('product2.name'),
      description: t('product2.description'),
      image: '/images/product2.jpg',
    },
    {
      id: 3,
      name: t('product3.name'),
      description: t('product3.description'),
      image: '/images/product3.jpg',
    },
  ]

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <Link
              href={`/products/${product.id}`}
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
