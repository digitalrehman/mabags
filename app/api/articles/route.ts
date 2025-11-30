import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Article, PaginatedResponse, ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")
    const tag = searchParams.get("tag")
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

    const db = await getDatabase()
    const articlesCollection = db.collection<Article>("articles")

    // Build filter query
    const filter: any = {}

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    if (tag) {
      filter.tags = tag
    }

    // Get total count
    const total = await articlesCollection.countDocuments(filter)

    // Get paginated results
    const skip = (page - 1) * limit
    const items = await articlesCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Convert ObjectId to string
    const articles = items.map((item) => ({
      ...item,
      _id: item._id?.toString(),
    }))

    const totalPages = Math.ceil(total / limit)
    const hasMore = page < totalPages

    const response: PaginatedResponse<Article> = {
      items: articles,
      total,
      page,
      totalPages,
      hasMore,
    }

    return NextResponse.json<ApiResponse<PaginatedResponse<Article>>>({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to fetch articles",
      },
      { status: 500 }
    )
  }
}
