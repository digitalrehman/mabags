import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Product, ProductFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured") === "true"
    const inStock = searchParams.get("inStock")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sort = searchParams.get("sort") || "newest"
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "12", 10)

    const db = await getDatabase()
    const productsCollection = db.collection<Product>("products")

    // Build filter query
    const filter: any = {}

    if (category) {
      filter.categories = category
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    if (featured) {
      filter.isFeatured = true
    }

    if (inStock !== null && inStock !== undefined) {
      filter.inStock = inStock === "true"
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice)
    }

    // Build sort query
    let sortQuery: any = {}
    switch (sort) {
      case "price-asc":
        sortQuery = { price: 1 }
        break
      case "price-desc":
        sortQuery = { price: -1 }
        break
      case "name":
        sortQuery = { title: 1 }
        break
      case "oldest":
        sortQuery = { createdAt: 1 }
        break
      case "newest":
      default:
        sortQuery = { createdAt: -1 }
        break
    }

    // Get total count
    const total = await productsCollection.countDocuments(filter)

    // Get paginated results
    const skip = (page - 1) * limit
    const items = await productsCollection
      .find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .toArray()

    // Convert ObjectId to string
    const products = items.map((item) => ({
      ...item,
      _id: item._id?.toString(),
    }))

    const totalPages = Math.ceil(total / limit)
    const hasMore = page < totalPages

    const response: PaginatedResponse<Product> = {
      items: products,
      total,
      page,
      totalPages,
      hasMore,
    }

    return NextResponse.json<ApiResponse<PaginatedResponse<Product>>>({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    )
  }
}
