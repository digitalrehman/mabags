module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDatabase",
    ()=>getDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI || "";
const options = {};
let client = null;
let clientPromise = null;
function getClientPromise() {
    if (!uri || !uri.startsWith("mongodb")) {
        throw new Error("Please add your MongoDB URI to .env.local. Get your connection string from MongoDB Atlas (https://cloud.mongodb.com)");
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // In development mode, use a global variable to preserve the connection
        if (!global._mongoClientPromise) {
            client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
            global._mongoClientPromise = client.connect();
        }
        return global._mongoClientPromise;
    } else //TURBOPACK unreachable
    ;
}
async function getDatabase() {
    const client = await getClientPromise();
    return client.db("mabags");
}
const __TURBOPACK__default__export__ = getClientPromise;
}),
"[project]/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
// Helper function to generate slug from title
function generateSlug(title) {
    return title.toLowerCase().trim().replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    ;
}
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const featured = searchParams.get("featured") === "true";
        const inStock = searchParams.get("inStock");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const sort = searchParams.get("sort") || "newest";
        const page = Number.parseInt(searchParams.get("page") || "1", 10);
        const limit = Number.parseInt(searchParams.get("limit") || "12", 10);
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const productsCollection = db.collection("products");
        // Build filter query
        const filter = {};
        if (category) {
            filter.categories = category;
        }
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }
        if (featured) {
            filter.isFeatured = true;
        }
        if (inStock !== null && inStock !== undefined) {
            filter.inStock = inStock === "true";
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number.parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice);
        }
        // Build sort query
        let sortQuery = {};
        switch(sort){
            case "price-asc":
                sortQuery = {
                    price: 1
                };
                break;
            case "price-desc":
                sortQuery = {
                    price: -1
                };
                break;
            case "name":
                sortQuery = {
                    title: 1
                };
                break;
            case "oldest":
                sortQuery = {
                    createdAt: 1
                };
                break;
            case "newest":
            default:
                sortQuery = {
                    createdAt: -1
                };
                break;
        }
        // Get total count
        const total = await productsCollection.countDocuments(filter);
        // Get paginated results
        const skip = (page - 1) * limit;
        const items = await productsCollection.find(filter).sort(sortQuery).skip(skip).limit(limit).toArray();
        // Convert ObjectId to string
        const products = items.map((item)=>({
                ...item,
                _id: item._id?.toString()
            }));
        const totalPages = Math.ceil(total / limit);
        const hasMore = page < totalPages;
        const response = {
            items: products,
            total,
            page,
            totalPages,
            hasMore
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to fetch products"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // Validate required fields
        if (!body.title || !body.price || !body.description) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const productsCollection = db.collection("products");
        // Generate slug from title
        const slug = generateSlug(body.title);
        // Create product object
        const newProduct = {
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
            createdAt: new Date()
        };
        const result = await productsCollection.insertOne(newProduct);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                _id: result.insertedId.toString(),
                ...newProduct
            },
            message: "Product created successfully"
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to create product"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const { _id, ...updateData } = body;
        if (!_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product ID is required"
            }, {
                status: 400
            });
        }
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const productsCollection = db.collection("products");
        // Convert string ID to ObjectId
        const objectId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](_id);
        // If title is being updated, regenerate slug
        if (updateData.title) {
            updateData.slug = generateSlug(updateData.title);
        }
        // Update product
        const result = await productsCollection.updateOne({
            _id: objectId
        }, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        });
        if (result.matchedCount === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to update product"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product ID is required"
            }, {
                status: 400
            });
        }
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const productsCollection = db.collection("products");
        // Convert string ID to ObjectId
        const objectId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id);
        // Delete product
        const result = await productsCollection.deleteOne({
            _id: objectId
        });
        if (result.deletedCount === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to delete product"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6074d0ce._.js.map