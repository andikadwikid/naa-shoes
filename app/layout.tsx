import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import { CartProvider } from "../hooks/useCart";
import { ToastProvider } from "../hooks/useToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAA Shoes - Toko Sepatu Wanita Terpercaya | Sneakers, Heels, Boots",
  description: "Koleksi sepatu wanita berkualitas tinggi dengan design modern dan trendy. Sneakers, high heels, boots, flats, dan sandals untuk wanita aktif usia 21-40 tahun. Gratis ongkir & garansi kualitas.",
  keywords: ["sepatu wanita", "sneakers wanita", "high heels", "boots", "sepatu online", "fashion wanita", "footwear"],
  authors: [{ name: "NAA Shoes" }],
  creator: "NAA Shoes",
  publisher: "NAA Shoes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://naashoes.com",
    title: "NAA Shoes - Toko Sepatu Wanita Terpercaya",
    description: "Koleksi sepatu wanita berkualitas tinggi dengan design modern dan trendy untuk wanita aktif.",
    siteName: "NAA Shoes",
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "NAA Shoes - Koleksi Sepatu Wanita Terbaru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAA Shoes - Toko Sepatu Wanita Terpercaya",
    description: "Koleksi sepatu wanita berkualitas tinggi dengan design modern dan trendy.",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=630&fit=crop"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://naashoes.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ToastProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
