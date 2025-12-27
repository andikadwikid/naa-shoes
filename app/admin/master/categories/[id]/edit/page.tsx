import { notFound } from 'next/navigation'
import { prisma } from '../../../../../../lib/prisma'
import CategoryForm from '../../CategoryForm'

interface EditCategoryPageProps {
  params: Promise<{ id: string }>
}

async function getCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: { id }
  })

  if (!category) {
    notFound()
  }

  return category
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const category = await getCategory(parseInt(id))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-gray-600">Update category information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  )
}
