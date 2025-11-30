"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const specialServices = [
  {
    title: "Custom Hajj & Umrah Bags",
    description:
      "Specially designed bags for pilgrims with features like prayer mat holders, ihram compartments, and lightweight yet durable construction.",
    image: "/travel-bag-white-pilgrim-hajj.jpg",
    features: ["Prayer Mat Holder", "Ihram Compartment", "Lightweight Design", "Durable Material"],
  },
  {
    title: "Professional Repair Services",
    description:
      "Expert repair services for all types of bags and luggage. We fix zippers, handles, wheels, and more to extend the life of your favorite bags.",
    image: "/bag-repair-service-workshop-tools-professional.jpg",
    features: ["Zipper Repair", "Handle Replacement", "Wheel Fixing", "Fabric Patching"],
  },
  {
    title: "Custom Orders",
    description:
      "Need something specific? We offer custom bag designs tailored to your exact requirements and preferences.",
    image: "/custom-bag-design-workshop-craftsmanship.jpg",
    features: ["Personalized Design", "Size Customization", "Color Options", "Logo Printing"],
  },
]

export function ServicesHighlight() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Special Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">More Than Just Bags</h2>
          <p className="text-lg text-muted-foreground">
            We offer specialized services to meet all your luggage and bag needs
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-16">
          {specialServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
