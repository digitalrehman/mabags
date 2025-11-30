import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Shipping Information",
    description: "Shipping Information for Ma Bags",
}

export default function ShippingInfoPage() {
    return (
        <div className="container mx-auto px-4 py-12 pt-24 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

            <div className="prose prose-slate max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
                    <p>
                        We currently deliver to all major cities and towns across Pakistan. If you are in a remote area, please contact our customer support to confirm delivery availability before placing your order.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Delivery Times</h2>
                    <p>
                        Our standard delivery times are:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li><strong>Karachi:</strong> 2-3 working days</li>
                        <li><strong>Other Major Cities (Lahore, Islamabad, etc.):</strong> 3-5 working days</li>
                        <li><strong>Remote Areas:</strong> 5-7 working days</li>
                    </ul>
                    <p className="mt-4">
                        Please note that delivery times may be affected by public holidays, weather conditions, and other unforeseen circumstances.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Shipping Charges</h2>
                    <p>
                        We offer free shipping on all orders above PKR 5,000. For orders below this amount, a standard shipping fee of PKR 250 applies.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
                    <p>
                        Once your order is dispatched, you will receive a tracking number via email and SMS. You can use this number to track your parcel on our courier partner's website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Returns & Exchanges</h2>
                    <p>
                        If you receive a damaged or incorrect item, please contact us within 24 hours of delivery. We offer a 7-day return policy for unused items in their original packaging. Please refer to our Return Policy page for more details.
                    </p>
                </section>
            </div>
        </div>
    )
}
