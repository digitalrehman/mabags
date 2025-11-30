import { Suspense } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star } from "lucide-react"
import Link from "next/link"
import type { Product, ApiResponse } from "@/lib/types"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getProduct(slug: string): Promise<Product | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        const res = await fetch(`${baseUrl}/api/products/${slug}`, {
            next: { revalidate: 30 },
        })

        if (!res.ok) {
            // Fallback to sample data if API fails
            const sampleProduct = getSampleProducts().find((p) => p.slug === slug)
            return sampleProduct || null
        }

        const data: ApiResponse<Product> = await res.json()
        return data.data || null
    } catch (error) {
        // Fallback to sample data
        const sampleProduct = getSampleProducts().find((p) => p.slug === slug)
        return sampleProduct || null
    }
}

// Sample data fallback (same as in collections page)
function getSampleProducts(): Product[] {
    return [
        {
            _id: "1",
            title: "Premium Trolley Bag - Large",
            slug: "premium-trolley-bag-large",
            price: 8500,
            originalPrice: 12000,
            description: "High-quality large trolley bag with spinner wheels and TSA lock. Perfect for long trips and family vacations. Made from durable ABS material that withstands rough handling.",
            features: ["360° spinner wheels", "TSA approved lock", "Expandable design", "Durable ABS material", "Telescopic handle", "Fully lined interior"],
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
            description: "Professional laptop bag with multiple compartments. Ideal for office and business travel. Fits laptops up to 15.6 inches with extra padding for protection.",
            features: ["Fits 15.6 inch laptops", "Water resistant", "Padded straps", "Multiple pockets", "USB charging port", "Luggage strap"],
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
            description: "Custom designed bag for pilgrims with ihram compartment. Lightweight and durable, designed specifically for the needs of Hajj and Umrah pilgrims.",
            features: ["Ihram compartment", "Prayer mat holder", "Lightweight", "Water bottle pocket", "Shoe compartment", "Easy to carry"],
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
            description: "Heavy duty waterproof bike cover for all weather protection. Protects your bike from rain, dust, sun, and scratches.",
            features: ["100% waterproof", "UV protection", "Elastic hem", "Lock holes", "Storage bag included", "Heat resistant"],
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
            description: "High quality car cover for sedans with soft inner lining. Protects your car paint from scratches and weather elements.",
            features: ["Soft inner lining", "UV protection", "Water resistant", "Mirror pockets", "Windproof straps", "Custom fit"],
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
            description: "Durable school backpack with laptop compartment. Ergonomic design for comfort during long school days.",
            features: ["Laptop compartment", "Padded back", "Multiple pockets", "Reflective strips", "Water bottle holder", "Reinforced stitching"],
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
            description: "Stylish travel duffle bag with shoe compartment. Perfect for weekend getaways and gym.",
            features: ["Shoe compartment", "Wet pocket", "Adjustable strap", "Stylish design", "Water resistant", "Lightweight"],
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
            description: "Complete furniture cover set for sofa and chairs. Protects your furniture from dust and spills.",
            features: ["Sofa cover included", "2 chair covers", "Elastic bands", "Washable", "Wrinkle free", "Easy to install"],
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
            description: "Compact cabin size trolley bag for short trips. Fits in overhead compartments of most airlines.",
            features: ["Cabin approved size", "4 spinner wheels", "Front pocket", "Lightweight", "TSA lock", "USB port"],
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
            description: "Professional messenger style laptop bag. Stylish and functional for the modern professional.",
            features: ["Fits 14 inch laptops", "Removable strap", "Organizer pocket", "Handle", "Magnetic closure", "Back pocket"],
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
            description: "Extra thick bike cover for maximum protection. Ideal for outdoor parking.",
            features: ["Double layer", "Anti-theft lock hole", "Windproof", "Storage bag included", "Heavy duty material", "Reflective strips"],
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
            description: "Extra large car cover for SUVs and crossovers. Full coverage protection.",
            features: ["Extra large size", "All weather", "Soft lining", "Easy storage", "Tie down straps", "Breathable fabric"],
            categories: ["car-covers"],
            images: [],
            mainImage: "/placeholder.svg?key=lxzsu",
            inStock: true,
            createdAt: new Date(),
        },
    ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slug = (await params).slug
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
    const slug = (await params).slug
    const product = await getProduct(slug)

    if (!product) {
        notFound()
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Link
                href="/collections"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Collections
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden border">
                    <Image
                        src={product.mainImage || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {product.isOnSale && (
                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm">
                            Sale
                        </Badge>
                    )}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-black px-4 py-2 rounded-full font-semibold">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.title}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(4.8/5 based on 24 reviews)</span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-primary">PKR {product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-lg text-muted-foreground line-through">
                                        PKR {product.originalPrice.toLocaleString()}
                                    </span>
                                    <Badge variant="secondary" className="text-red-500 border border-red-200 bg-red-50">
                                        {discount}% OFF
                                    </Badge>
                                </>
                            )}
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* WhatsApp Button */}
                        <a
                            href={`https://wa.me/923183961814?text=${encodeURIComponent(
                                `Hi, I'm interested in:\n\n*${product.title}*\nPrice: PKR ${product.price.toLocaleString()}\n\nPlease provide more details.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-colors mb-8"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.47,22.25c-2.13,0-4.22-.56-6.06-1.64l-4.4,1.15,1.18-4.3a10.18,10.18,0,0,1-1.94-6A10.26,10.26,0,0,1,23.73,6.83a10.23,10.23,0,0,1-6.26,15.42ZM12.25,4.25A8,8,0,0,0,4.74,15.44l.23.36L4,19l3.27-.86.35.21a8,8,0,0,0,12.63-6.49A8,8,0,0,0,12.25,4.25Zm4.65,10.89c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.12-.66.82-.81,1-.3.19-.55.06a6.93,6.93,0,0,1-2-1.24,7.59,7.59,0,0,1-1.4-1.73c-.15-.25,0-.38.11-.51s.25-.3.37-.44a1.62,1.62,0,0,0,.25-.41.46.46,0,0,0,0-.44c-.06-.12-.57-1.37-.78-1.87s-.41-.43-.57-.44-.31,0-.48,0a.91.91,0,0,0-.66.31,2.78,2.78,0,0,0-.87,2.07,4.83,4.83,0,0,0,1,2.57,11.06,11.06,0,0,0,4.29,3.79,14.37,14.37,0,0,0,1.43.53,3.45,3.45,0,0,0,1.59.1,2.55,2.55,0,0,0,1.67-1.18,2.07,2.07,0,0,0,.15-1.18C17.3,15.33,17.15,15.27,16.9,15.14Z" />
                            </svg>
                            Order via WhatsApp
                        </a>
                    </div>

                    <div className="border-t pt-8">
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
