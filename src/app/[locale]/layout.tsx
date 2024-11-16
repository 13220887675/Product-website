import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Your Company Name',
    default: 'Your Company Name - Professional Products and Solutions',
  },
  description: 'Professional products and solutions for your business needs',
  openGraph: {
    title: 'Your Company Name',
    description: 'Professional products and solutions for your business needs',
    url: 'https://your-domain.com',
    siteName: 'Your Company Name',
    locale: 'en_US',
    type: 'website',
  },
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
