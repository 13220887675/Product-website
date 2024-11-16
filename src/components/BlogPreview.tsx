import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function BlogPreview() {
  const t = useTranslations('Blog')

  const posts = [
    {
      id: 1,
      title: t('post1.title'),
      excerpt: t('post1.excerpt'),
      date: t('post1.date'),
      image: '/images/blog1.jpg',
      author: t('post1.author'),
    },
    {
      id: 2,
      title: t('post2.title'),
      excerpt: t('post2.excerpt'),
      date: t('post2.date'),
      image: '/images/blog2.jpg',
      author: t('post2.author'),
    },
    {
      id: 3,
      title: t('post3.title'),
      excerpt: t('post3.excerpt'),
      date: t('post3.date'),
      image: '/images/blog3.jpg',
      author: t('post3.author'),
    },
  ]

  return (
    <>
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              href={`/blog/${post.id}`}
              className="text-primary dark:text-primary-light hover:underline"
            >
              {t('readMore')}
            </Link>
          </div>
        </article>
      ))}
    </>
  )
}
