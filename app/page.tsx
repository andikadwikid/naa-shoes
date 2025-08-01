import Image from "next/image"
import Link from "next/link"
import ProductCard from "./components/ProductCard"
import { featuredProducts } from "./data/products"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-pink-500 to-rose-400 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Step Into Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Koleksi sepatu wanita terbaru untuk gaya hidup modern Anda
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/products"
                className="inline-block bg-white text-pink-600 font-semibold px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors duration-200"
              >
                Shop Now
              </Link>
              <Link
                href="/products?filter=sale"
                className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-colors duration-200"
              >
                Sale Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-pink-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-pink-700 font-medium">
              🎉 Special Promo: Diskon hingga 30% untuk pembelian 2 pasang sepatu atau lebih!
              <Link href="/products" className="underline ml-2 hover:text-pink-900">
                Shop Sekarang
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Koleksi Terfavorit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan sepatu pilihan terbaik yang paling disukai pelanggan kami.
              Dari yang trendy hingga klasik, semuanya ada di sini.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Pilih kategori sesuai dengan kebutuhan dan gaya Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', count: '25+ styles' },
              { name: 'High Heels', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop', count: '30+ styles' },
              { name: 'Flats', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=300&h=300&fit=crop', count: '20+ styles' },
              { name: 'Boots', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&h=300&fit=crop', count: '15+ styles' }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Dapatkan update koleksi terbaru dan promo eksklusif langsung ke email Anda
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
