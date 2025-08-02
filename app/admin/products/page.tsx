import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../../../lib/prisma'
import ProductActions from './ProductActions'

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      images: {
        where: { isPrimary: true },
        take: 1
      },
      sizes: {
        include: { size: true }
      },
      colors: {
        include: { color: true }
      }
    }
  })
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your store products</p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
              <div className="mt-6">
                <Link
                  href="/admin/products/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative aspect-square">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <div className="flex gap-1">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          SALE
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category.name}</p>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>
                      {product.colors.length} color{product.colors.length !== 1 ? 's' : ''}
                    </span>
                    <span>
                      {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}
                    </span>
                    <span>
                      Stock: {product.sizes.reduce((total, size) => total + size.stock, 0)}
                    </span>
                  </div>

                  {/* Actions */}
                  <ProductActions product={product} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
