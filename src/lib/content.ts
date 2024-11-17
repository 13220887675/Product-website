import fs from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import { BlogPost } from '@/types/blog'
import { Product } from '@/types/product'

const contentDirectory = path.join(process.cwd(), 'src', 'content')

// 确保目录存在
function ensureDirectoryExists(directory: string) {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true })
  }
}

export async function getProduct(locale: string, id: string): Promise<Product | null> {
  try {
    const filePath = path.join(contentDirectory, locale, 'products', `${id}.json`)
    ensureDirectoryExists(path.dirname(filePath))
    const content = await fs.readFile(filePath, 'utf8')
    return {
      id,
      ...JSON.parse(content)
    }
  } catch (error) {
    console.error(`Error loading product ${id} in ${locale}:`, error)
    return null
  }
}

export async function getBlogPost(locale: string, slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, locale, 'blog', `${slug}.json`)
    ensureDirectoryExists(path.dirname(filePath))
    const content = await fs.readFile(filePath, 'utf8')
    return {
      slug,
      ...JSON.parse(content)
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug} in ${locale}:`, error)
    return null
  }
}

export async function getAllProducts(locale: string): Promise<Product[]> {
  try {
    const productsDirectory = path.join(contentDirectory, locale, 'products')
    ensureDirectoryExists(productsDirectory)
    
    const files = await fs.readdir(productsDirectory)
    
    // 只处理数字命名的文件（1.json, 2.json, 3.json等）
    const productFiles = files.filter(file => /^\d+\.json$/.test(file))
    
    const products = await Promise.all(
      productFiles.map(async (file) => {
        const id = path.basename(file, '.json')
        const product = await getProduct(locale, id)
        return product
      })
    )

    return products.filter((product): product is Product => product !== null)
  } catch (error) {
    console.error(`Error loading products in ${locale}:`, error)
    return []
  }
}

export async function getAllBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const blogDirectory = path.join(contentDirectory, locale, 'blog')
    ensureDirectoryExists(blogDirectory)
    
    const files = await fs.readdir(blogDirectory)
    
    const posts = await Promise.all(
      files.map(async (file) => {
        const slug = path.basename(file, '.json')
        const post = await getBlogPost(locale, slug)
        return post
      })
    )

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`Error loading blog posts in ${locale}:`, error)
    return []
  }
}
