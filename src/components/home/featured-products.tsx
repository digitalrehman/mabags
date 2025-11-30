"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
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
              Featured Products
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Best Sellers</h2>
          </div>
          <Link href="/collections" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All Products
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/collections/${product.slug}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden group h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.mainImage || "/placeholder.svg?height=400&width=400&query=bag luggage product"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isOnSale && <Badge variant="primary">Sale</Badge>}
                      {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                    </div>
                    {/* Quick View */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.categories?.slice(0, 1).map((cat) => (
                        <span key={cat} className="text-xs text-muted-foreground capitalize">
                          {cat.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
