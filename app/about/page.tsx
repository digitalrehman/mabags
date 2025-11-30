import type { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { MissionSection } from "@/components/about/mission-section"
import { ServicesHighlight } from "@/components/about/services-highlight"
import { WhyChooseUs } from "@/components/about/why-choose-us"
import { siteConfig } from "@/config/global"

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.about.description,
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <ServicesHighlight />
      <WhyChooseUs />
    </>
  )
}
