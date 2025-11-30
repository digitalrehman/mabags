"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitted(true)
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setError("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">Thank you for contacting us. We'll get back to you soon.</p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
      <p className="text-muted-foreground mb-8">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Input name="name" label="Full Name" placeholder="John Doe" required />
          <Input name="email" type="email" label="Email Address" placeholder="john@example.com" required />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Input name="phone" type="tel" label="Phone Number" placeholder="+92 300 1234567" />
          <Input name="subject" label="Subject" placeholder="How can we help?" />
        </div>

        <Textarea name="message" label="Message" placeholder="Write your message here..." rows={5} required />

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && (
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
