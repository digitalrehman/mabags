"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "./product-card"
import { ProductFilters } from "./product-filters"
import { ProductModal } from "./product-modal"
import { siteConfig } from "@/config/global"
import type { Product, PaginatedResponse } from "@/lib/types"

interface ProductsGridProps {
  initialProducts: PaginatedResponse<Product>
  category?: string
  search?: string
  sort?: string
}

export function ProductsGrid({ initialProducts, category, search, sort }: ProductsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(initialProducts.items)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(search || "")
  const [selectedCategory, setSelectedCategory] = useState(category || "")
  const [selectedSort, setSelectedSort] = useState(sort || "newest")

  useEffect(() => {
    setProducts(initialProducts.items)
  }, [initialProducts])

  const handleFilterChange = (filters: { category?: string; search?: string; sort?: string }) => {
    setIsLoading(true)
    const params = new URLSearchParams(searchParams.toString())

    if (filters.category !== undefined) {
      setSelectedCategory(filters.category)
      if (filters.category) {
        params.set("category", filters.category)
      } else {
        params.delete("category")
      }
    }

    if (filters.search !== undefined) {
      setSearchTerm(filters.search)
      if (filters.search) {
        params.set("search", filters.search)
      } else {
        params.delete("search")
      }
    }

    if (filters.sort !== undefined) {
      setSelectedSort(filters.sort)
      if (filters.sort && filters.sort !== "newest") {
        params.set("sort", filters.sort)
      } else {
        params.delete("sort")
      }
    }

    router.push(`/collections?${params.toString()}`)
    setIsLoading(false)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedSort("newest")
    router.push("/collections")
  }

  const hasActiveFilters = !!(selectedCategory || searchTerm || selectedSort !== "newest")

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <ProductFilters
          categories={siteConfig.services}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          selectedSort={selectedSort}
          viewMode={viewMode}
          onCategoryChange={(cat) => handleFilterChange({ category: cat })}
          onSearchChange={(s) => handleFilterChange({ search: s })}
          onSortChange={(s) => handleFilterChange({ sort: s })}
          onViewModeChange={setViewMode}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          totalProducts={products.length}
        />

        {/* Products */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
            <button onClick={clearFilters} className="text-primary font-medium hover:underline">
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" : "space-y-4"
            }
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination placeholder */}
        {initialProducts.hasMore && (
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
