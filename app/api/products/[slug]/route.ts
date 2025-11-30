import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Product, ApiResponse } from "@/lib/types"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const slug = (await params).slug

        if (!slug) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: "Product slug is required",
                },
                { status: 400 }
            )
        }

        const db = await getDatabase()
        const productsCollection = db.collection<Product>("products")

        const product = await productsCollection.findOne({ slug })

        if (!product) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: "Product not found",
                },
                { status: 404 }
            )
        }

        // Convert ObjectId to string
        const result = {
            ...product,
            _id: product._id?.toString(),
        }

        return NextResponse.json<ApiResponse<Product>>({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error("Error fetching product:", error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: "Failed to fetch product",
            },
            { status: 500 }
        )
    }
}
