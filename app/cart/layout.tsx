import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Shopping Cart - NAA Shoes | Review Your Selected Items",
  description: "Review your selected women's shoes in your shopping cart. Secure checkout via WhatsApp. Free shipping on all orders from NAA Shoes.",
  keywords: ["shopping cart", "checkout", "women's shoes", "secure payment", "free shipping"],
  openGraph: {
    title: "Shopping Cart - NAA Shoes",
    description: "Review your selected items and proceed to secure checkout",
    url: "https://naashoes.com/cart",
    type: "website",
  },
  alternates: {
    canonical: "https://naashoes.com/cart",
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
