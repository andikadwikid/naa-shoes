import ColorForm from '../../ColorForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditColorPageProps {
  params: Promise<{ id: string }>
}

export default async function EditColorPage({ params }: EditColorPageProps) {
  const { id } = await params
  
  const color = await prisma.color.findUnique({
    where: { id: parseInt(id) }
  })

  if (!color) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Color</h1>
        <p className="text-gray-600">Update color information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ColorForm
          color={{
            id: color.id,
            name: color.name,
            hexCode: color.hexCode || '#000000'
          }}
        />
      </div>
    </div>
  )
}
