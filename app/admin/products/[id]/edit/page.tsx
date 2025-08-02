import ProductForm from '../../ProductForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      colors: {
        include: {
          color: true
        }
      },
      sizes: {
        include: {
          size: true
        }
      }
    }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update product information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ProductForm 
          product={{
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            categoryId: product.categoryId,
            isNew: product.isNew,
            isOnSale: product.isOnSale,
            isActive: product.isActive,
            material: product.material,
            weight: product.weight
          }}
        />
      </div>
    </div>
  )
}
