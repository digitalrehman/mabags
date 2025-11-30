import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { siteConfig } from "@/config/global"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.siteTitle}. Visit our store at ${siteConfig.contact.address} or call us at ${siteConfig.contact.phone}.`,
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactMap />
    </>
  )
}
