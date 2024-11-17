'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  const getLocalizedHref = (href: string) => {
    return `/${href}`
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <p className="text-gray-400">{t('description')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('products')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedHref('/products')} className="text-gray-400 hover:text-white">
                  {t('allProducts')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedHref('/blog')} className="text-gray-400 hover:text-white">
                  {t('blog')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t('address')}</li>
              <li>Tel: {t('phone')}</li>
              <li>Email: {t('email')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
