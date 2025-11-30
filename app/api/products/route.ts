import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Product, ProductFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

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

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.price || !body.description) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const productsCollection = db.collection<Product>("products")

    // Generate slug from title
    const slug = generateSlug(body.title)

    // Create product object
    const newProduct: Product = {
      title: body.title,
      slug: slug,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      description: body.description,
      features: body.features || [],
      categories: body.categories || [],
      images: body.images || [],
      mainImage: body.mainImage || "",
      inStock: body.inStock !== false,
      isFeatured: body.isFeatured || false,
      isOnSale: body.isOnSale || false,
      createdAt: new Date(),
    }

    const result = await productsCollection.insertOne(newProduct as any)

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { _id: result.insertedId.toString(), ...newProduct },
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Product ID is required",
        },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const productsCollection = db.collection<Product>("products")

    // Convert string ID to ObjectId
    const objectId = new ObjectId(_id)

    // If title is being updated, regenerate slug
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title)
    }

    // Update product
    const result = await productsCollection.updateOne(
      { _id: objectId } as any,
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to update product",
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Product ID is required",
        },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const productsCollection = db.collection<Product>("products")

    // Convert string ID to ObjectId
    const objectId = new ObjectId(id)

    // Delete product
    const result = await productsCollection.deleteOne({ _id: objectId } as any)

    if (result.deletedCount === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 }
    )
  }
}
