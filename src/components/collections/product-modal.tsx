"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/config/global"
import type { Product } from "@/lib/types"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) return null

  const images = product.images?.length > 0 ? product.images : [product.mainImage || "/bag.jpg"]

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ordering:\n\n*${product.title}*\nPrice: ${formatPrice(product.price)}\n\nPlease provide more details.`,
    )
    window.open(`${siteConfig.contact.socialLinks.whatsapp}?text=${message}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-accent transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                {/* Images Section */}
                <div className="relative bg-muted p-6">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={images[selectedImage] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    {product.isOnSale && (
                      <Badge variant="primary" className="absolute top-3 left-3">
                        Sale
                      </Badge>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                            selectedImage === index ? "border-primary" : "border-transparent"
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
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col">
                  <div className="flex-1">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.categories?.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-1 bg-accent rounded-full text-muted-foreground capitalize"
                        >
                          {cat.replace("-", " ")}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{product.title}</h2>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-xl text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <Badge variant="success">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                      <span
                        className={`text-sm ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Features</h3>
                        <ul className="space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <svg
                                className="w-4 h-4 text-primary flex-shrink-0"
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
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Button size="lg" className="w-full" onClick={handleWhatsAppOrder} disabled={!product.inStock}>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.47,22.25c-2.13,0-4.22-.56-6.06-1.64l-4.4,1.15,1.18-4.3a10.18,10.18,0,0,1-1.94-6A10.26,10.26,0,0,1,23.73,6.83a10.23,10.23,0,0,1-6.26,15.42ZM12.25,4.25A8,8,0,0,0,4.74,15.44l.23.36L4,19l3.27-.86.35.21a8,8,0,0,0,12.63-6.49A8,8,0,0,0,12.25,4.25Z" />
                      </svg>
                      Order via WhatsApp
                    </Button>
                    <div className="flex gap-3">
                      <Link href={`/collections/${product.slug}`} className="flex-1">
                        <Button variant="outline" size="lg" className="w-full bg-transparent">
                          View Full Details
                        </Button>
                      </Link>
                      <Link href={`/contact?product=${product.slug}`} className="flex-1">
                        <Button variant="secondary" size="lg" className="w-full">
                          Inquire
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
