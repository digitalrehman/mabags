import type { Metadata } from "next"
import { ArticlesGrid } from "@/components/articles/articles-grid"
import type { Article, PaginatedResponse } from "@/lib/types"

export const metadata: Metadata = {
  title: "Articles & Blog",
  description: "Read our latest articles about bags, travel tips, and more.",
}

async function getArticles(): Promise<PaginatedResponse<Article>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return getSampleArticles()
    }

    const data = await res.json()
    return data.data || getSampleArticles()
  } catch {
    return getSampleArticles()
  }
}

function getSampleArticles(): PaginatedResponse<Article> {
  const articles: Article[] = [
    {
      _id: "1",
      title: "How to Choose the Perfect Travel Bag",
      slug: "how-to-choose-perfect-travel-bag",
      excerpt:
        "A comprehensive guide to selecting the right travel bag for your needs and style. Learn about different types of bags and what to look for.",
      content: "Full article content here...",
      tags: ["Travel Tips", "Buying Guide"],
      coverImage: "/travel-bag-selection-guide.jpg",
      createdAt: new Date("2025-01-15"),
    },
    {
      _id: "2",
      title: "Hajj and Umrah Packing Essentials",
      slug: "hajj-umrah-packing-essentials",
      excerpt:
        "Everything you need to pack for a comfortable and spiritual journey. Our complete checklist for pilgrims.",
      content: "Full article content here...",
      tags: ["Hajj", "Umrah", "Packing Tips"],
      coverImage: "/hajj-pilgrimage-bags-packing.jpg",
      createdAt: new Date("2025-01-10"),
    },
    {
      _id: "3",
      title: "Caring for Your Leather Bags",
      slug: "caring-for-leather-bags",
      excerpt: "Tips and tricks to keep your leather bags looking new for years. Maintenance guide from our experts.",
      content: "Full article content here...",
      tags: ["Care Tips", "Leather"],
      coverImage: "/leather-bag-care-maintenance.jpg",
      createdAt: new Date("2025-01-05"),
    },
  ]

  return {
    items: articles,
    total: articles.length,
    page: 1,
    totalPages: 1,
    hasMore: false,
  }
}

export default async function ArticlesPage() {
  const articlesData = await getArticles()

  return <ArticlesGrid initialArticles={articlesData} />
}
