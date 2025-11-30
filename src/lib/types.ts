// MongoDB Document Types

export interface Product {
  _id?: string
  title: string
  slug: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  categories: string[]
  images: string[]
  mainImage: string
  inStock: boolean
  isFeatured?: boolean
  isOnSale?: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface Article {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  coverImage: string
  author?: string
  createdAt: Date
  updatedAt?: Date
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  createdAt: Date
  ipAddress?: string
  isRead?: boolean
}

export interface AdminSession {
  _id?: string
  token: string
  createdAt: Date
  expiresAt: Date
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  search?: string
  inStock?: boolean
  minPrice?: number
  maxPrice?: number
  sort?: "newest" | "oldest" | "price-asc" | "price-desc" | "name"
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}
