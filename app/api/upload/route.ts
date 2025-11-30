import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64File, {
      folder: "mabags-products",
      resource_type: "auto",
      transformation: [
        { width: 800, height: 800, crop: "limit" }, // Max dimensions
        { quality: "auto:good" }, // Auto quality optimization
        { fetch_format: "auto" }, // Auto format (WebP for modern browsers)
      ],
    })

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    })
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    )
  }
}
