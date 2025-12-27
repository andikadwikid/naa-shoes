import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Artikel Tidak Ditemukan
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Maaf, artikel yang Anda cari tidak dapat ditemukan. Mungkin artikel tersebut telah dipindahkan atau tidak tersedia.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/blog"
            className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Kembali ke Blog
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
