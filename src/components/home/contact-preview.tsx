"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { siteConfig } from "@/config/global"
import { Button } from "@/components/ui/button"

export function ContactPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Visit Our Store</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Come visit us at our store location. Our friendly staff will help you find the perfect bag for your needs.
              We also offer custom Hajj and Umrah bags and professional repair services.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Store Address</p>
                  <p className="text-muted-foreground text-sm">
                    {siteConfig.contact.address}, {siteConfig.contact.city}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone Number</p>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Working Hours</p>
                  <p className="text-muted-foreground text-sm">Mon-Fri: {siteConfig.contact.workingHours.weekdays}</p>
                </div>
              </motion.div>
            </div>

            <Link href="/contact">
              <Button size="lg">
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </motion.div>

          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border"
          >
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${siteConfig.contact.mapCoordinates.lng - 0.01}%2C${siteConfig.contact.mapCoordinates.lat - 0.01}%2C${siteConfig.contact.mapCoordinates.lng + 0.01}%2C${siteConfig.contact.mapCoordinates.lat + 0.01}&layer=mapnik&marker=${siteConfig.contact.mapCoordinates.lat}%2C${siteConfig.contact.mapCoordinates.lng}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="MA Bags Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-xl border border-border">
              <p className="font-semibold text-foreground">{siteConfig.siteTitle}</p>
              <p className="text-sm text-muted-foreground">{siteConfig.contact.address}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
