import type { Metadata } from "next"
import { Suspense } from "react"
import { CollectionsHero } from "@/components/collections/collections-hero"
import { ProductsGrid } from "@/components/collections/products-grid"
import { ProductsSkeleton } from "@/components/collections/products-skeleton"
import type { Product, PaginatedResponse } from "@/lib/types"

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse our complete collection of premium bags, luggage, and covers. Find trolley bags, laptop bags, suitcases, and more.",
}

interface PageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: string
    page?: string
    sale?: string
  }>
}

async function getProducts(params: {
  category?: string
  search?: string
  sort?: string
  page?: string
  sale?: string
}): Promise<PaginatedResponse<Product>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const searchParams = new URLSearchParams()

    if (params.category) searchParams.set("category", params.category)
    if (params.search) searchParams.set("search", params.search)
    if (params.sort) searchParams.set("sort", params.sort)
    if (params.page) searchParams.set("page", params.page)
    if (params.sale === "true") searchParams.set("sale", "true")
    searchParams.set("limit", "12")

    const res = await fetch(`${baseUrl}/api/products?${searchParams.toString()}`, {
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      return getSampleProducts()
    }

    const data = await res.json()
    return data.data || getSampleProducts()
  } catch {
    return getSampleProducts()
  }
}

function getSampleProducts(): PaginatedResponse<Product> {
  const products: Product[] = [
    {
      _id: "1",
      title: "Premium Trolley Bag - Large",
      slug: "premium-trolley-bag-large",
      price: 8500,
      originalPrice: 12000,
      description: "High-quality large trolley bag with spinner wheels and TSA lock",
      features: ["360° spinner wheels", "TSA approved lock", "Expandable design", "Durable ABS material"],
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
      description: "Professional laptop bag with multiple compartments",
      features: ["Fits 15.6 inch laptops", "Water resistant", "Padded straps", "Multiple pockets"],
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
      description: "Custom designed bag for pilgrims with ihram compartment",
      features: ["Ihram compartment", "Prayer mat holder", "Lightweight", "Water bottle pocket"],
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
      originalPrice: 2500,
      description: "Heavy duty waterproof bike cover for all weather protection",
      features: ["100% waterproof", "UV protection", "Elastic hem", "Lock holes"],
      categories: ["bike-covers"],
      images: [],
      mainImage: "/bike-cover-black-waterproof.jpg",
      inStock: true,
      isOnSale: true,
      createdAt: new Date(),
    },
    {
      _id: "5",
      title: "Premium Car Cover - Sedan",
      slug: "premium-car-cover-sedan",
      price: 3500,
      description: "High quality car cover for sedans with soft inner lining",
      features: ["Soft inner lining", "UV protection", "Water resistant", "Mirror pockets"],
      categories: ["car-covers"],
      images: [],
      mainImage: "/placeholder.svg?key=27qda",
      inStock: true,
      createdAt: new Date(),
    },
    {
      _id: "6",
      title: "Boys School Backpack",
      slug: "boys-school-backpack",
      price: 2200,
      description: "Durable school backpack with laptop compartment",
      features: ["Laptop compartment", "Padded back", "Multiple pockets", "Reflective strips"],
      categories: ["boys-bags"],
      images: [],
      mainImage: "/placeholder.svg?key=a9yd9",
      inStock: true,
      createdAt: new Date(),
    },
    {
      _id: "7",
      title: "Girls Travel Duffle",
      slug: "girls-travel-duffle",
      price: 2800,
      originalPrice: 3500,
      description: "Stylish travel duffle bag with shoe compartment",
      features: ["Shoe compartment", "Wet pocket", "Adjustable strap", "Stylish design"],
      categories: ["girls-travel"],
      images: [],
      mainImage: "/travel-duffel-bag-stylish.jpg",
      inStock: true,
      isOnSale: true,
      createdAt: new Date(),
    },
    {
      _id: "8",
      title: "Furniture Cover Set",
      slug: "furniture-cover-set",
      price: 4500,
      description: "Complete furniture cover set for sofa and chairs",
      features: ["Sofa cover included", "2 chair covers", "Elastic bands", "Washable"],
      categories: ["furniture-covers"],
      images: [],
      mainImage: "/placeholder.svg?key=gnk3p",
      inStock: true,
      createdAt: new Date(),
    },
    {
      _id: "9",
      title: "Cabin Trolley Bag",
      slug: "cabin-trolley-bag",
      price: 5500,
      description: "Compact cabin size trolley bag for short trips",
      features: ["Cabin approved size", "4 spinner wheels", "Front pocket", "Lightweight"],
      categories: ["trolley-bags"],
      images: [],
      mainImage: "/premium-trolley-suitcase-red-luggage.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
    {
      _id: "10",
      title: "Laptop Messenger Bag",
      slug: "laptop-messenger-bag",
      price: 3200,
      description: "Professional messenger style laptop bag",
      features: ["Fits 14 inch laptops", "Removable strap", "Organizer pocket", "Handle"],
      categories: ["laptop-bags"],
      images: [],
      mainImage: "/laptop-bag-professional-backpack.jpg",
      inStock: false,
      createdAt: new Date(),
    },
    {
      _id: "11",
      title: "Heavy Duty Bike Cover",
      slug: "heavy-duty-bike-cover",
      price: 2500,
      description: "Extra thick bike cover for maximum protection",
      features: ["Double layer", "Anti-theft lock hole", "Windproof", "Storage bag included"],
      categories: ["bike-covers"],
      images: [],
      mainImage: "/placeholder.svg?key=9t6wd",
      inStock: true,
      createdAt: new Date(),
    },
    {
      _id: "12",
      title: "SUV Car Cover",
      slug: "suv-car-cover",
      price: 4500,
      description: "Extra large car cover for SUVs and crossovers",
      features: ["Extra large size", "All weather", "Soft lining", "Easy storage"],
      categories: ["car-covers"],
      images: [],
      mainImage: "/placeholder.svg?key=lxzsu",
      inStock: true,
      createdAt: new Date(),
    },
  ]

  return {
    items: products,
    total: products.length,
    page: 1,
    totalPages: 1,
    hasMore: false,
  }
}

export default async function CollectionsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const productsData = await getProducts(params)

  return (
    <>
      <CollectionsHero category={params.category} search={params.search} isSale={params.sale === "true"} />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsGrid
          initialProducts={productsData}
          category={params.category}
          search={params.search}
          sort={params.sort}
        />
      </Suspense>
    </>
  )
}
