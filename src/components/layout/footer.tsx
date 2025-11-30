"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/global"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MA</span>
              </div>
              <span className="text-xl font-bold text-foreground">{siteConfig.siteTitle}</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{siteConfig.footer.tagline}</p>
            {/* Social Links */}
            {siteConfig.footer.showSocialLinks && (
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={siteConfig.contact.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={siteConfig.contact.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={siteConfig.contact.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.47,22.25c-2.13,0-4.22-.56-6.06-1.64l-4.4,1.15,1.18-4.3a10.18,10.18,0,0,1-1.94-6A10.26,10.26,0,0,1,23.73,6.83a10.23,10.23,0,0,1-6.26,15.42ZM12.25,4.25A8,8,0,0,0,4.74,15.44l.23.36L4,19l3.27-.86.35.21a8,8,0,0,0,12.63-6.49A8,8,0,0,0,12.25,4.25Zm4.65,10.89c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.12-.66.82-.81,1-.3.19-.55.06a6.93,6.93,0,0,1-2-1.24,7.59,7.59,0,0,1-1.4-1.73c-.15-.25,0-.38.11-.51s.25-.3.37-.44a1.62,1.62,0,0,0,.25-.41.46.46,0,0,0,0-.44c-.06-.12-.57-1.37-.78-1.87s-.41-.43-.57-.44-.31,0-.48,0a.91.91,0,0,0-.66.31,2.78,2.78,0,0,0-.87,2.07,4.83,4.83,0,0,0,1,2.57,11.06,11.06,0,0,0,4.29,3.79,14.37,14.37,0,0,0,1.43.53,3.45,3.45,0,0,0,1.59.1,2.55,2.55,0,0,0,1.67-1.18,2.07,2.07,0,0,0,.15-1.18C17.3,15.33,17.15,15.27,16.9,15.14Z" />
                  </svg>
                </motion.a>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-foreground font-semibold text-base mb-4">Categories</h3>
            <ul className="space-y-2">
              {siteConfig.services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/collections?category=${service.slug}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                <span className="text-muted-foreground text-sm">
                  {siteConfig.contact.address}, {siteConfig.contact.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-muted-foreground text-sm">
                  Mon-Fri: {siteConfig.contact.workingHours.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {siteConfig.siteTitle} — All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {siteConfig.navigation.footer.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
