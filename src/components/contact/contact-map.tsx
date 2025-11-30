"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/global"

export function ContactMap() {
  const { lat, lng } = siteConfig.contact.mapCoordinates

  // Note: Update these coordinates to match the exact location of MA Bags store
  // Current coordinates: lat: 24.927, lng: 67.123
  // To update: modify the mapCoordinates in src/config/global.ts

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Find Us on the Map</h2>
          <p className="text-muted-foreground">
            {siteConfig.contact.address}, {siteConfig.contact.city}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-lg"
        >
          {/* OpenStreetMap Embed */}
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.01}%2C${lng + 0.02}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="MA Bags Store Location"
            className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
          />

          {/* Info Card Overlay */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-xl border border-border shadow-lg max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">MA</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{siteConfig.siteTitle}</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.contact.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center mt-1"
                >
                  Open in Google Maps
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
