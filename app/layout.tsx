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
  title: "NAA Shoes - Toko Sepatu Wanita Terpercaya",
  description: "Koleksi sepatu wanita berkualitas tinggi dengan design modern dan trendy untuk wanita aktif usia 21-40 tahun",
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
