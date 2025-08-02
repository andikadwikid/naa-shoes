import SizeForm from '../../SizeForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditSizePageProps {
  params: Promise<{ id: string }>
}

export default async function EditSizePage({ params }: EditSizePageProps) {
  const { id } = await params
  
  const size = await prisma.size.findUnique({
    where: { id: parseInt(id) }
  })

  if (!size) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Size</h1>
        <p className="text-gray-600">Update size information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <SizeForm 
          size={{
            id: size.id,
            value: size.value
          }}
        />
      </div>
    </div>
  )
}
