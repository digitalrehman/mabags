import { HeroSection } from "@/components/home/hero-section"
import { AboutTeaser } from "@/components/home/about-teaser"
import { ServicesSection } from "@/components/home/services-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { PromotionBanner } from "@/components/home/promotion-banner"
import { ArticlesPreview } from "@/components/home/articles-preview"
import { ContactPreview } from "@/components/home/contact-preview"
import type { Product, Article } from "@/lib/types"

// Fetch featured products from API
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/products?featured=true&limit=4`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.data?.items || []
  } catch {
    // Return sample products if API fails
    return getSampleProducts()
  }
}

// Fetch latest articles from API
async function getLatestArticles(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/articles?limit=3`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.data?.items || []
  } catch {
    // Return sample articles if API fails
    return getSampleArticles()
  }
}

// Sample products for fallback
function getSampleProducts(): Product[] {
  return [
    {
      _id: "1",
      title: "Premium Trolley Bag",
      slug: "premium-trolley-bag",
      price: 8500,
      originalPrice: 12000,
      description: "High-quality trolley bag with durable wheels",
      features: ["Durable wheels", "Multiple compartments", "TSA lock"],
      categories: ["trolley-bags"],
      images: [],
      mainImage: "/red-trolley-suitcase-premium.jpg",
      inStock: true,
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Executive Laptop Bag",
      slug: "executive-laptop-bag",
      price: 4500,
      description: "Professional laptop bag for business",
      features: ["Padded laptop compartment", "Water resistant", "Ergonomic straps"],
      categories: ["laptop-bags"],
      images: [],
      mainImage: "/black-laptop-bag-professional.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Hajj & Umrah Special Bag",
      slug: "hajj-umrah-special-bag",
      price: 3500,
      description: "Custom designed bag for pilgrims",
      features: ["Spacious interior", "Lightweight", "Prayer mat holder"],
      categories: ["suitcases"],
      images: [],
      mainImage: "/travel-bag-white-pilgrim-hajj.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
    {
      _id: "4",
      title: "Waterproof Bike Cover",
      slug: "waterproof-bike-cover",
      price: 1800,
      description: "Heavy duty bike cover for all weather",
      features: ["100% waterproof", "UV protection", "Elastic hem"],
      categories: ["bike-covers"],
      images: [],
      mainImage: "/bike-cover-black-waterproof.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
  ]
}

// Sample articles for fallback
function getSampleArticles(): Article[] {
  return [
    {
      _id: "1",
      title: "How to Choose the Perfect Travel Bag",
      slug: "how-to-choose-perfect-travel-bag",
      excerpt: "A comprehensive guide to selecting the right travel bag for your needs and style.",
      content: "",
      tags: ["Travel Tips", "Buying Guide"],
      coverImage: "/travel-bag-selection-guide.jpg",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Hajj and Umrah Packing Essentials",
      slug: "hajj-umrah-packing-essentials",
      excerpt: "Everything you need to pack for a comfortable and spiritual journey.",
      content: "",
      tags: ["Hajj", "Umrah", "Packing Tips"],
      coverImage: "/hajj-pilgrimage-bags-packing.jpg",
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Caring for Your Leather Bags",
      slug: "caring-for-leather-bags",
      excerpt: "Tips and tricks to keep your leather bags looking new for years.",
      content: "",
      tags: ["Care Tips", "Leather"],
      coverImage: "/leather-bag-care-maintenance.jpg",
      createdAt: new Date(),
    },
  ]
}

export default async function HomePage() {
  const [products, articles] = await Promise.all([getFeaturedProducts(), getLatestArticles()])

  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <ServicesSection />
      <FeaturedProducts products={products} />
      <PromotionBanner />
      <ArticlesPreview articles={articles} />
      <ContactPreview />
    </>
  )
}
