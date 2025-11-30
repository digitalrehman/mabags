"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { siteConfig } from "@/config/global"
import { Button } from "@/components/ui/button"

export function PromotionBanner() {
  if (!siteConfig.promotion.enabled) return null

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {siteConfig.promotion.title}
                  </h2>
                  <p className="text-xl sm:text-2xl text-white/90 font-semibold mb-4">
                    {siteConfig.promotion.subtitle}
                  </p>
                  <p className="text-white/80 mb-8 max-w-md mx-auto lg:mx-0">{siteConfig.promotion.description}</p>
                  <Link href={siteConfig.promotion.ctaLink}>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      {siteConfig.promotion.ctaText}
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden lg:block relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10 flex justify-center items-center"
                >
                  <div className="text-center">
                    <p className="text-8xl md:text-9xl font-bold text-white/20">40%</p>
                    <p className="text-2xl font-semibold text-white -mt-6">OFF</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
