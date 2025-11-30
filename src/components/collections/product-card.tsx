"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  onClick: () => void
}

export function ProductCard({ product, viewMode }: Omit<ProductCardProps, "onClick">) {
  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.slug}`} className="block h-full">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card border border-border rounded-xl overflow-hidden group cursor-pointer h-full"
        >
          <div className="flex gap-4 p-4 h-full">
            {/* Image */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.mainImage || "/placeholder.svg?height=200&width=200&query=bag"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.isOnSale && <Badge variant="primary">Sale</Badge>}
                  {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-primary text-sm font-medium hover:underline">
                  View Details
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-card border border-border rounded-xl overflow-hidden group cursor-pointer h-full"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.mainImage || "/placeholder.svg?height=400&width=400&query=bag"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isOnSale && <Badge variant="primary">Sale</Badge>}
            {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
          </div>
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">View Details</span>
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
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
