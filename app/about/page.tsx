import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="gradient-text">NAA Shoes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate about empowering women through stylish, comfortable, and high-quality footwear
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              NAA Shoes didirikan dengan visi untuk memberikan sepatu berkualitas tinggi yang 
              menggabungkan gaya modern dan kenyamanan maksimal untuk wanita aktif usia 21-40 tahun.
            </p>
            <p className="mb-4">
              Kami memahami bahwa setiap wanita memiliki kebutuhan yang berbeda - dari profesional 
              muda yang membutuhkan sepatu formal untuk kantor, hingga ibu muda yang mencari sneakers 
              nyaman untuk aktivitas sehari-hari.
            </p>
            <p>
              Tim kami terdiri dari desainer berpengalaman dan ahli material yang berdedikasi untuk 
              menciptakan koleksi sepatu yang tidak hanya indah dipandang, tetapi juga memberikan 
              dukungan dan kenyamanan sepanjang hari.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-pink-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              Memberikan sepatu berkualitas tinggi yang memadukan style, comfort, dan affordability 
              untuk mendukung gaya hidup aktif wanita modern.
            </p>
          </div>
          <div className="bg-rose-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-rose-600 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              Menjadi brand sepatu wanita terdepan yang dikenal karena inovasi design, 
              kualitas material, dan pelayanan pelanggan yang exceptional.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm">
                Menggunakan material terbaik dan proses produksi yang ketat untuk menjamin kualitas setiap produk.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm">
                Mengutamakan kepuasan pelanggan dengan pelayanan yang ramah dan responsif.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Terus berinovasi dalam design dan teknologi untuk menciptakan sepatu yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
