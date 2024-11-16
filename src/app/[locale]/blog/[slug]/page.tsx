import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'

interface Props {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('Blog')
  const postId = parseInt(params.slug)
  
  if (postId < 1 || postId > 3) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: t(`post${postId}.title`),
    description: t(`post${postId}.excerpt`),
    openGraph: {
      title: t(`post${postId}.title`),
      description: t(`post${postId}.excerpt`),
      type: 'article',
      publishedTime: t(`post${postId}.date`),
    },
  }
}

export default function BlogPost({ params }: Props) {
  const t = useTranslations('Blog')
  const postId = parseInt(params.slug)

  if (postId < 1 || postId > 3) {
    notFound()
  }

  const post = {
    id: postId,
    title: t(`post${postId}.title`),
    content: t(`post${postId}.content`).split('|'),
    date: new Date(t(`post${postId}.date`)),
    author: t(`post${postId}.author`),
    image: `/images/blog${postId}.jpg`,
    tags: t(`post${postId}.tags`).split(','),
  }

  const dateLocale = params.locale === 'zh' ? zhCN : enUS

  return (
    <main className="min-h-screen py-16">
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
            <span className="mr-4">{t('by')} {post.author}</span>
            <time dateTime={post.date.toISOString()}>
              {format(post.date, 'PPP', { locale: dateLocale })}
            </time>
          </div>
          <div className="flex gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{t('shareTitle')}</h2>
          <div className="flex gap-4">
            {/* 社交分享按钮 */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              Facebook
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              WeChat
            </button>
          </div>
        </div>
      </article>
    </main>
  )
}
