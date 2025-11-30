// Global Configuration for MA Bags
// Client can modify all site content from this single file

export const siteConfig = {
  // Brand Identity
  siteTitle: "MA Bags",
  siteDescription: "Premium luggage and bags. Custom Hajj and Umrah bags. Professional repair services.",
  logoPath: "/assets/logo.png",

  // Brand Colors - Used throughout the site
  brandColors: {
    primary: "#E11D1D", // MA Bags Red
    primaryDark: "#B91818", // Darker variant for hover states
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },

  // Hero Section Content
  hero: {
    headline: "Where Fashion Meets Everyday Life",
    subHeadline: "All kinds of bags & luggage. Custom Hajj and Umrah bags. Repairing service available.",
    ctaText: "Shop Collection",
    ctaLink: "/collections",
    secondaryCta: "Learn More",
    secondaryLink: "/about",
    image: "/assets/hero-banner.jpg",
  },

  // About Section
  about: {
    title: "About MA Bags",
    subtitle: "Your Trusted Partner for Quality Luggage",
    description:
      "MA Bags has been serving customers with premium quality bags and luggage for years. We specialize in custom Hajj and Umrah bags, ensuring pilgrims travel with comfort and style. Our expert repair services extend the life of your beloved bags.",
    mission:
      "Our mission is to provide high-quality, durable, and stylish bags that meet the diverse needs of our customers. From everyday use to special journeys, we've got you covered.",
    features: [
      "Premium Quality Materials",
      "Custom Hajj & Umrah Bags",
      "Professional Repair Services",
      "Wide Range of Categories",
      "Affordable Prices",
      "Customer Satisfaction Guaranteed",
    ],
    image: "/assets/about-image.jpg",
  },

  // Services/Categories
  services: [
    {
      name: "Laptop Bags",
      slug: "laptop-bags",
      description: "Professional laptop bags for work and travel",
      icon: "laptop",
    },
    {
      name: "Trolley Bags",
      slug: "trolley-bags",
      description: "Durable trolley bags for easy travel",
      icon: "trolley",
    },
    {
      name: "Suitcases",
      slug: "suitcases",
      description: "Premium suitcases for all your journeys",
      icon: "suitcase",
    },
    {
      name: "Bike Covers",
      slug: "bike-covers",
      description: "Protective covers for your bikes",
      icon: "bike",
    },
    {
      name: "Car Covers",
      slug: "car-covers",
      description: "Quality car covers for protection",
      icon: "car",
    },
    {
      name: "Furniture Covers",
      slug: "furniture-covers",
      description: "Durable covers for your furniture",
      icon: "furniture",
    },
    {
      name: "Boys Bags",
      slug: "boys-bags",
      description: "Stylish bags for boys",
      icon: "backpack",
    },
    {
      name: "Girls Travel",
      slug: "girls-travel",
      description: "Elegant travel bags for girls",
      icon: "travel",
    },
  ],

  // Promotional Banner
  promotion: {
    enabled: true,
    title: "Winter Sale",
    subtitle: "Up to 40% Off on Selected Items",
    description: "Don't miss out on our biggest sale of the season. Quality bags at unbeatable prices!",
    ctaText: "Shop Now",
    ctaLink: "/collections?sale=true",
    endDate: "2025-02-28",
    backgroundColor: "#E11D1D",
  },

  // Contact Information
  contact: {
    phone: "+92 318 3961814",
    phoneRaw: "03183961814",
    email: "bagsma514@gmail.com",
    address: "Shumil Arcade, Gulistan-e-Johar A1-C2",
    city: "Karachi",
    country: "Pakistan",
    // Map coordinates for Leaflet/Google Maps
    // Update these coordinates to match exact location
    mapCoordinates: {
      lat: 24.927,
      lng: 67.123,
    },
    workingHours: {
      weekdays: "10:00 AM - 9:00 PM",
      weekends: "11:00 AM - 8:00 PM",
    },
    socialLinks: {
      facebook: "https://facebook.com/mabags",
      instagram: "https://instagram.com/mabags",
      whatsapp: "https://wa.me/923183961814",
    },
  },

  // Navigation Links
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Collections", href: "/collections" },
      { name: "Contact", href: "/contact" },
    ],
    footer: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Shipping Info", href: "/shipping" },
    ],
  },

  // Footer Content
  footer: {
    tagline: "Quality bags for every journey",
    copyright: "© 2025 MA Bags — All Rights Reserved.",
    showSocialLinks: true,
    showNewsletter: true,
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Subscribe for exclusive offers and updates",
  },

  // Theme Configuration
  theme: {
    default: "light" as "light" | "dark",
    supported: ["light", "dark"] as const,
    storageKey: "ma-bags-theme",
  },

  // SEO Defaults
  seo: {
    defaultTitle: "MA Bags - Premium Luggage & Bags",
    titleTemplate: "%s | MA Bags",
    defaultDescription:
      "Premium quality bags and luggage. Custom Hajj and Umrah bags. Professional repair services. Shop trolley bags, laptop bags, suitcases, and more.",
    keywords: [
      "bags",
      "luggage",
      "trolley bags",
      "laptop bags",
      "Hajj bags",
      "Umrah bags",
      "suitcases",
      "Karachi",
      "Pakistan",
    ],
  },

  // Cloudinary Configuration (for reference - actual keys in env)
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ma-bags-uploads",
  },

  // EmailJS Configuration (for reference - actual keys in env)
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  },
}

// Type exports for TypeScript support
export type SiteConfig = typeof siteConfig
export type Service = (typeof siteConfig.services)[number]
export type NavItem = (typeof siteConfig.navigation.main)[number]

export default siteConfig
