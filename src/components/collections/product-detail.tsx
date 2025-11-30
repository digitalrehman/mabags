"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/config/global"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const images = product.images?.length > 0 ? product.images : [product.mainImage || "/bag.jpg"]

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ordering:\n\n*${product.title}*\nPrice: ${formatPrice(product.price)}\n\nPlease provide more details.`,
    )
    window.open(`${siteConfig.contact.socialLinks.whatsapp}?text=${message}`, "_blank")
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-foreground transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.isOnSale && discount > 0 && (
                <Badge variant="primary" className="absolute top-4 left-4 text-base px-4 py-1">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories?.map((cat) => (
                <Link
                  key={cat}
                  href={`/collections?category=${cat}`}
                  className="text-sm px-3 py-1 bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors capitalize"
                >
                  {cat.replace("-", " ")}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{product.title}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-2xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="success" className="text-sm">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span
                className={`font-medium ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {product.inStock ? "In Stock - Ready to Ship" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-3">Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full text-lg h-14"
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.47,22.25c-2.13,0-4.22-.56-6.06-1.64l-4.4,1.15,1.18-4.3a10.18,10.18,0,0,1-1.94-6A10.26,10.26,0,0,1,23.73,6.83a10.23,10.23,0,0,1-6.26,15.42ZM12.25,4.25A8,8,0,0,0,4.74,15.44l.23.36L4,19l3.27-.86.35.21a8,8,0,0,0,12.63-6.49A8,8,0,0,0,12.25,4.25Z" />
                </svg>
                {product.inStock ? "Order via WhatsApp" : "Out of Stock"}
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Inquire
                  </Button>
                </Link>
                <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                  <Button variant="secondary" size="lg" className="w-full">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-4">
              {[
                { icon: "shield", label: "Quality Guaranteed" },
                { icon: "truck", label: "Fast Delivery" },
                { icon: "refresh", label: "Easy Returns" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    {badge.icon === "shield" && (
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    )}
                    {badge.icon === "truck" && (
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    )}
                    {badge.icon === "refresh" && (
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
