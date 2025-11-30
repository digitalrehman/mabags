import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/collections/product-detail"
import type { Product } from "@/lib/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      // Return sample product for demo
      return getSampleProduct(slug)
    }

    const data = await res.json()
    return data.data || getSampleProduct(slug)
  } catch {
    return getSampleProduct(slug)
  }
}

function getSampleProduct(slug: string): Product | null {
  const sampleProducts: Record<string, Product> = {
    "premium-trolley-bag-large": {
      _id: "1",
      title: "Premium Trolley Bag - Large",
      slug: "premium-trolley-bag-large",
      price: 8500,
      originalPrice: 12000,
      description:
        "Experience premium travel with our flagship trolley bag. Designed for durability and style, this large trolley bag features 360° spinner wheels for effortless maneuverability, a TSA-approved lock for security, and an expandable design for extra packing space. Made from high-quality ABS material that withstands the rigors of travel while maintaining its elegant appearance.",
      features: [
        "360° spinner wheels for smooth mobility",
        "TSA approved combination lock",
        "Expandable design adds 20% more space",
        "Durable ABS material construction",
        "Telescopic handle with multiple height settings",
        "Interior mesh pockets and elastic straps",
        "Reinforced corners for impact protection",
        "Lightweight design at only 4.2kg",
      ],
      categories: ["trolley-bags"],
      images: ["/red-trolley-suitcase-premium.jpg", "/premium-trolley-suitcase-red-luggage.jpg"],
      mainImage: "/red-trolley-suitcase-premium.jpg",
      inStock: true,
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date(),
    },
    "executive-laptop-bag": {
      _id: "2",
      title: "Executive Laptop Bag",
      slug: "executive-laptop-bag",
      price: 4500,
      description:
        "The perfect companion for the modern professional. This executive laptop bag combines functionality with sophisticated design. Features dedicated compartments for your laptop, documents, and accessories, all wrapped in water-resistant material for protection against the elements.",
      features: [
        "Fits laptops up to 15.6 inches",
        "Water resistant exterior",
        "Padded shoulder straps for comfort",
        "Multiple organizational pockets",
        "Dedicated tablet sleeve",
        "Business card holder",
        "Luggage strap for travel",
        "Reinforced handle",
      ],
      categories: ["laptop-bags"],
      images: ["/black-laptop-bag-professional.jpg", "/laptop-bag-professional-backpack.jpg"],
      mainImage: "/black-laptop-bag-professional.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
    "hajj-umrah-special-bag": {
      _id: "3",
      title: "Hajj & Umrah Special Bag",
      slug: "hajj-umrah-special-bag",
      price: 3500,
      description:
        "Specially designed for pilgrims embarking on their sacred journey. This thoughtfully crafted bag includes dedicated compartments for Ihram, prayer mat, and essential items. Lightweight yet durable, it's designed to make your spiritual journey more comfortable.",
      features: [
        "Dedicated Ihram compartment",
        "Built-in prayer mat holder",
        "Lightweight design (under 1.5kg)",
        "Water bottle pocket",
        "Document holder with zipper",
        "Comfortable padded straps",
        "Durable fabric construction",
        "Easy-clean interior lining",
      ],
      categories: ["suitcases"],
      images: ["/travel-bag-white-pilgrim-hajj.jpg"],
      mainImage: "/travel-bag-white-pilgrim-hajj.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: new Date(),
    },
  }

  return sampleProducts[slug] || null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
