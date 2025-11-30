"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import type { Service } from "@/config/global"

interface ProductFiltersProps {
  categories: Service[]
  selectedCategory: string
  searchTerm: string
  selectedSort: string
  viewMode: "grid" | "list"
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onViewModeChange: (mode: "grid" | "list") => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  totalProducts: number
}

export function ProductFilters({
  categories,
  selectedCategory,
  searchTerm,
  selectedSort,
  viewMode,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onClearFilters,
  hasActiveFilters,
  totalProducts,
}: ProductFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchTerm)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(localSearch)
  }

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
  ]

  return (
    <div className="mb-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full md:w-80 pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        {/* Right side controls */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Results count */}
          <span className="text-sm text-muted-foreground hidden sm:block">{totalProducts} products</span>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-accent rounded-lg text-foreground"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>

          {/* Sort dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-accent rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm" : ""}`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm" : ""}`}
              aria-label="List view"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills - Desktop */}
      <div className="hidden md:flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => onCategoryChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory ? "bg-primary text-white" : "bg-accent text-foreground hover:bg-accent/80"
          }`}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.slug ? "bg-primary text-white" : "bg-accent text-foreground hover:bg-accent/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 border-t border-border">
              <h3 className="font-semibold text-foreground mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange("")}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    !selectedCategory ? "bg-primary text-white" : "bg-accent text-foreground"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => onCategoryChange(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedCategory === cat.slug ? "bg-primary text-white" : "bg-accent text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {categories.find((c) => c.slug === selectedCategory)?.name}
              <button onClick={() => onCategoryChange("")} className="hover:text-primary/70">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              "{searchTerm}"
              <button
                onClick={() => {
                  setLocalSearch("")
                  onSearchChange("")
                }}
                className="hover:text-primary/70"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          <button onClick={onClearFilters} className="text-sm text-muted-foreground hover:text-foreground">
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
