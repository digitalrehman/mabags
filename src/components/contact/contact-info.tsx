"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/global"

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visit Our Store",
    details: [siteConfig.contact.address, `${siteConfig.contact.city}, ${siteConfig.contact.country}`],
    action: {
      label: "Get Directions",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address + ", " + siteConfig.contact.city)}`,
    },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: "Call Us",
    details: [siteConfig.contact.phone],
    action: {
      label: "Call Now",
      href: `tel:${siteConfig.contact.phoneRaw}`,
    },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Email Us",
    details: [siteConfig.contact.email],
    action: {
      label: "Send Email",
      href: `mailto:${siteConfig.contact.email}`,
    },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.47,22.25c-2.13,0-4.22-.56-6.06-1.64l-4.4,1.15,1.18-4.3a10.18,10.18,0,0,1-1.94-6A10.26,10.26,0,0,1,23.73,6.83a10.23,10.23,0,0,1-6.26,15.42ZM12.25,4.25A8,8,0,0,0,4.74,15.44l.23.36L4,19l3.27-.86.35.21a8,8,0,0,0,12.63-6.49A8,8,0,0,0,12.25,4.25Zm4.65,10.89c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.12-.66.82-.81,1-.3.19-.55.06a6.93,6.93,0,0,1-2-1.24,7.59,7.59,0,0,1-1.4-1.73c-.15-.25,0-.38.11-.51s.25-.3.37-.44a1.62,1.62,0,0,0,.25-.41.46.46,0,0,0,0-.44c-.06-.12-.57-1.37-.78-1.87s-.41-.43-.57-.44-.31,0-.48,0a.91.91,0,0,0-.66.31,2.78,2.78,0,0,0-.87,2.07,4.83,4.83,0,0,0,1,2.57,11.06,11.06,0,0,0,4.29,3.79,14.37,14.37,0,0,0,1.43.53,3.45,3.45,0,0,0,1.59.1,2.55,2.55,0,0,0,1.67-1.18,2.07,2.07,0,0,0,.15-1.18C17.3,15.33,17.15,15.27,16.9,15.14Z" />
      </svg>
    ),
    title: "WhatsApp",
    details: ["Chat with us on WhatsApp"],
    action: {
      label: "Start Chat",
      href: siteConfig.contact.socialLinks.whatsapp,
    },
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Contact Information</h2>
      <p className="text-muted-foreground mb-8">Reach out to us through any of these channels.</p>

      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                {method.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                {method.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
                <a
                  href={method.action.href}
                  target={method.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center text-primary text-sm font-medium mt-2 hover:underline"
                >
                  {method.action.label}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5"
      >
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Working Hours
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="text-foreground font-medium">{siteConfig.contact.workingHours.weekdays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday - Sunday</span>
            <span className="text-foreground font-medium">{siteConfig.contact.workingHours.weekends}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
