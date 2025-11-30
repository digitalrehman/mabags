"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface ArticlesPreviewProps {
  articles: Article[]
}

export function ArticlesPreview({ articles }: ArticlesPreviewProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Latest News
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">From Our Blog</h2>
          </div>
          <Link href="/articles" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All Articles
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                      src={
                        article.coverImage || "/placeholder.svg?height=300&width=500&query=blog article bags luggage"
                      }
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
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
      </div>
    </section>
  )
}
