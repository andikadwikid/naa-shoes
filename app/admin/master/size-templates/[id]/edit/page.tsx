import SizeTemplateForm from '../../SizeTemplateForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditSizeTemplatePageProps {
  params: Promise<{ id: string }>
}

export default async function EditSizeTemplatePage({ params }: EditSizeTemplatePageProps) {
  const { id } = await params
  
  const template = await prisma.sizeTemplate.findUnique({
    where: { id: parseInt(id) }
  })

  if (!template) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Size Template</h1>
        <p className="text-gray-600">Update size template information and configuration</p>
      </div>

      <SizeTemplateForm
        template={{
          id: template.id,
          name: template.name,
          description: template.description || undefined,
          category: template.category || undefined,
          isDefault: template.isDefault
        }}
      />
    </div>
  )
}
