"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/global"

interface CollectionsHeroProps {
  category?: string
  search?: string
  isSale?: boolean
}

export function CollectionsHero({ category, search, isSale }: CollectionsHeroProps) {
  const getCategoryName = () => {
    if (isSale) return "Sale Items"
    if (search) return `Search: "${search}"`
    if (category) {
      const service = siteConfig.services.find((s) => s.slug === category)
      return service?.name || category.replace(/-/g, " ")
    }
    return "All Products"
  }

  const getDescription = () => {
    if (isSale) return "Grab amazing deals on selected items. Limited time offers!"
    if (search) return `Showing results for "${search}"`
    if (category) {
      const service = siteConfig.services.find((s) => s.slug === category)
      return service?.description || "Browse our collection"
    }
    return "Explore our complete range of premium bags and covers"
  }

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {isSale && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-4"
            >
              Special Offers
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 capitalize"
          >
            {getCategoryName()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {getDescription()}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
