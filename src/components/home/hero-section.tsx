"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/global"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/luxury-luggage-bags-travel-suitcases-elegant-dark-.jpg" alt="MA Bags Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50 dark:from-background dark:via-background/95 dark:to-background/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Premium Quality Luggage
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              {siteConfig.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {siteConfig.hero.subHeadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={siteConfig.hero.ctaLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  {siteConfig.hero.ctaText}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href={siteConfig.hero.secondaryLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  {siteConfig.hero.secondaryCta}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border"
            >
              {[
                { value: "500+", label: "Products" },
                { value: "10K+", label: "Happy Customers" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[600px]">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-80 h-80"
              >
                <Image
                  src="/premium-trolley-suitcase-red-luggage.jpg"
                  alt="Premium Trolley Bag"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-72 h-72"
              >
                <Image
                  src="/laptop-bag-professional-backpack.jpg"
                  alt="Laptop Bag"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64"
              >
                <Image
                  src="/travel-duffel-bag-stylish.jpg"
                  alt="Travel Bag"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
