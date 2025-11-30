"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { siteConfig } from "@/config/global"

export function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image src="/professional-bag-manufacturing-workshop-quality-cr.jpg" alt="Quality Craftsmanship" fill className="object-cover" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-primary/10 rounded-2xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Committed to Excellence</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{siteConfig.about.mission}</p>

            {/* Values */}
            <div className="space-y-4">
              {[
                { title: "Quality First", desc: "Premium materials and craftsmanship in every product" },
                { title: "Customer Focus", desc: "Your satisfaction is our top priority" },
                { title: "Innovation", desc: "Constantly improving our designs and offerings" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
