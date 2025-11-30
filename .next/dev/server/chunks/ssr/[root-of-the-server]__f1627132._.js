module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/home/hero-section'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/about-teaser'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/services-section'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/featured-products'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/promotion-banner'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/articles-preview'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/contact-preview'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
;
;
// Fetch featured products from API
async function getFeaturedProducts() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/products?featured=true&limit=4`, {
            next: {
                revalidate: 60
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data?.items || [];
    } catch  {
        // Return sample products if API fails
        return getSampleProducts();
    }
}
// Fetch latest articles from API
async function getLatestArticles() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/articles?limit=3`, {
            next: {
                revalidate: 60
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data?.items || [];
    } catch  {
        // Return sample articles if API fails
        return getSampleArticles();
    }
}
// Sample products for fallback
function getSampleProducts() {
    return [
        {
            _id: "1",
            title: "Premium Trolley Bag",
            slug: "premium-trolley-bag",
            price: 8500,
            originalPrice: 12000,
            description: "High-quality trolley bag with durable wheels",
            features: [
                "Durable wheels",
                "Multiple compartments",
                "TSA lock"
            ],
            categories: [
                "trolley-bags"
            ],
            images: [],
            mainImage: "/red-trolley-suitcase-premium.jpg",
            inStock: true,
            isFeatured: true,
            isOnSale: true,
            createdAt: new Date()
        },
        {
            _id: "2",
            title: "Executive Laptop Bag",
            slug: "executive-laptop-bag",
            price: 4500,
            description: "Professional laptop bag for business",
            features: [
                "Padded laptop compartment",
                "Water resistant",
                "Ergonomic straps"
            ],
            categories: [
                "laptop-bags"
            ],
            images: [],
            mainImage: "/black-laptop-bag-professional.jpg",
            inStock: true,
            isFeatured: true,
            createdAt: new Date()
        },
        {
            _id: "3",
            title: "Hajj & Umrah Special Bag",
            slug: "hajj-umrah-special-bag",
            price: 3500,
            description: "Custom designed bag for pilgrims",
            features: [
                "Spacious interior",
                "Lightweight",
                "Prayer mat holder"
            ],
            categories: [
                "suitcases"
            ],
            images: [],
            mainImage: "/travel-bag-white-pilgrim-hajj.jpg",
            inStock: true,
            isFeatured: true,
            createdAt: new Date()
        },
        {
            _id: "4",
            title: "Waterproof Bike Cover",
            slug: "waterproof-bike-cover",
            price: 1800,
            description: "Heavy duty bike cover for all weather",
            features: [
                "100% waterproof",
                "UV protection",
                "Elastic hem"
            ],
            categories: [
                "bike-covers"
            ],
            images: [],
            mainImage: "/bike-cover-black-waterproof.jpg",
            inStock: true,
            isFeatured: true,
            createdAt: new Date()
        }
    ];
}
// Sample articles for fallback
function getSampleArticles() {
    return [
        {
            _id: "1",
            title: "How to Choose the Perfect Travel Bag",
            slug: "how-to-choose-perfect-travel-bag",
            excerpt: "A comprehensive guide to selecting the right travel bag for your needs and style.",
            content: "",
            tags: [
                "Travel Tips",
                "Buying Guide"
            ],
            coverImage: "/travel-bag-selection-guide.jpg",
            createdAt: new Date()
        },
        {
            _id: "2",
            title: "Hajj and Umrah Packing Essentials",
            slug: "hajj-umrah-packing-essentials",
            excerpt: "Everything you need to pack for a comfortable and spiritual journey.",
            content: "",
            tags: [
                "Hajj",
                "Umrah",
                "Packing Tips"
            ],
            coverImage: "/hajj-pilgrimage-bags-packing.jpg",
            createdAt: new Date()
        },
        {
            _id: "3",
            title: "Caring for Your Leather Bags",
            slug: "caring-for-leather-bags",
            excerpt: "Tips and tricks to keep your leather bags looking new for years.",
            content: "",
            tags: [
                "Care Tips",
                "Leather"
            ],
            coverImage: "/leather-bag-care-maintenance.jpg",
            createdAt: new Date()
        }
    ];
}
async function HomePage() {
    const [products, articles] = await Promise.all([
        getFeaturedProducts(),
        getLatestArticles()
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroSection, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AboutTeaser, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ServicesSection, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturedProducts, {
                products: products
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PromotionBanner, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticlesPreview, {
                articles: articles
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactPreview, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f1627132._.js.map