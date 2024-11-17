import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface Props {
  post: BlogPost
  locale: string
}

const translations = {
  en: {
    readMore: 'Read More',
  },
  zh: {
    readMore: '阅读更多',
  },
}

export default function BlogPreview({ post, locale }: Props) {
  const t = translations[locale as keyof typeof translations]
  const imageUrl = post.image || '/images/defaults/default-blog.jpg'

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="text-primary dark:text-primary-light hover:underline"
        >
          {t.readMore}
        </Link>
      </div>
    </article>
  )
}
