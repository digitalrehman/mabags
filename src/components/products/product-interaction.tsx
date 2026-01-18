"use client"

import { useState, useEffect } from "react"
import { Star, Eye, Facebook, Instagram } from "lucide-react"
import { siteConfig } from "@/config/global"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ProductInteractionProps {
    slug: string
    initialRating?: number
    initialReviewCount?: number
    initialViews?: number
}

export function ProductInteraction({ 
    slug, 
    initialRating = 0, 
    initialReviewCount = 0,
    initialViews = 0
}: ProductInteractionProps) {
    const [rating, setRating] = useState(initialRating)
    const [hover, setHover] = useState(0)
    const [reviewCount, setReviewCount] = useState(initialReviewCount)
    const [views, setViews] = useState(initialViews)
    const [hasRated, setHasRated] = useState(false)

    useEffect(() => {
        // Optimistic increment for "live" feel
        setViews(v => v + 1)

        // Increment view count in database
        const incrementView = async () => {
            try {
                await fetch(`/api/products/${slug}/interact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'view' })
                })
            } catch (err) {
                console.error("Failed to track view", err)
            }
        }
        incrementView()

        // Check if already rated (simple localStorage check)
        const ratedProducts = JSON.parse(localStorage.getItem('rated_products') || '{}')
        if (ratedProducts[slug]) setHasRated(true)
    }, [slug])

    const handleRate = async (value: number) => {
        if (hasRated) {
            toast.error("Aap pehle hi rate kar chuke hain!")
            return
        }

        try {
            const res = await fetch(`/api/products/${slug}/interact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'rating', rating: value })
            })

            if (res.ok) {
                const data = await res.json()
                toast.success("Shukriya! Aapki rating save ho gayi hai.")
                setHasRated(true)
                // In real app, we might want to refetch the new average
                // For now, we just update local state a bit
                setReviewCount(prev => prev + 1)
                
                // Save to local storage
                const ratedProducts = JSON.parse(localStorage.getItem('rated_products') || '{}')
                ratedProducts[slug] = true
                localStorage.setItem('rated_products', JSON.stringify(ratedProducts))
            }
        } catch (err) {
            toast.error("Rating save nahi ho saki.")
        }
    }

    return (
        <div className="space-y-6">
            {/* View Counter & Social Links */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
                    <Eye className="w-4 h-4" />
                    <span>{views.toLocaleString()} views</span>
                </div>
                
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 h-9"
                        onClick={() => window.open(siteConfig.contact.socialLinks.facebook, '_blank')}
                    >
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                        Visit FB Page
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 h-9"
                        onClick={() => window.open(siteConfig.contact.socialLinks.instagram, '_blank')}
                    >
                        <Instagram className="w-4 h-4 text-[#E1306C]" />
                        Visit IG Page
                    </Button>
                </div>
            </div>

            {/* Rating Section */}
            <div className="bg-muted/30 p-4 rounded-xl space-y-3">
                <h4 className="font-semibold text-sm">Rate this Product:</h4>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className="transition-transform active:scale-95"
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => handleRate(star)}
                                disabled={hasRated}
                            >
                                <Star 
                                    className={`w-6 h-6 ${
                                        (hover || rating) >= star 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-muted-foreground"
                                    }`} 
                                />
                            </button>
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {rating > 0 ? `${rating.toFixed(1)} / 5` : "Be the first to rate!"}
                        {reviewCount > 0 && ` (${reviewCount} reviews)`}
                    </div>
                </div>
                {hasRated && <p className="text-[10px] text-green-600 font-medium">✓ You have rated this product</p>}
            </div>
        </div>
    )
}
