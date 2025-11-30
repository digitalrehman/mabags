"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { Article, PaginatedResponse } from "@/lib/types"

interface ArticlesGridProps {
  initialArticles: PaginatedResponse<Article>
}

export function ArticlesGrid({ initialArticles }: ArticlesGridProps) {
  const articles = initialArticles.items

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Articles & Tips</h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest news, tips, and guides about bags, travel, and more.
          </p>
        </motion.div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No articles available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/articles/${article.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden group h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.coverImage || "/placeholder.svg?height=300&width=500&query=blog"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{formatDate(article.createdAt)}</span>
                        <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                          Read More
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
