export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  featured?: boolean
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}
