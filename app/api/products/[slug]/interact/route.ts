import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import type { Product, ApiResponse } from "@/lib/types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const slug = (await params).slug;
    const body = await request.json();
    const { type, rating } = body; // type: 'view' | 'rating'

    if (!slug) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Slug is required" },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const productsCollection = db.collection<Product>("products");

    if (type === "view") {
      await productsCollection.updateOne(
        { slug },
        { $inc: { views: 1 } as any },
      );
      return NextResponse.json<ApiResponse>({
        success: true,
        message: "View counted",
      });
    }

    if (type === "rating" && typeof rating === "number") {
      const product = await productsCollection.findOne({ slug });
      if (!product)
        return NextResponse.json<ApiResponse>(
          { success: false, error: "Product not found" },
          { status: 404 },
        );

      const oldRating = product.rating || 0;
      const oldCount = product.reviewCount || 0;
      const newCount = oldCount + 1;
      const newRating = (oldRating * oldCount + rating) / newCount;

      await productsCollection.updateOne(
        { slug },
        { $set: { rating: newRating, reviewCount: newCount } as any },
      );
      return NextResponse.json<ApiResponse>({
        success: true,
        message: "Rating submitted",
      });
    }

    return NextResponse.json<ApiResponse>(
      { success: false, error: "Invalid interaction type" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error in product interaction:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
