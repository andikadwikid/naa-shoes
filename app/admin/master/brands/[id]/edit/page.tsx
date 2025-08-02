import { notFound } from 'next/navigation'
import { prisma } from '../../../../../../lib/prisma'
import BrandForm from '../../BrandForm'

interface PageProps {
  params: {
    id: string
  }
}

async function getBrand(id: number) {
  return await prisma.brand.findUnique({
    where: { id }
  })
}

export default async function EditBrandPage({ params }: PageProps) {
  const brandId = parseInt(params.id)
  
  if (isNaN(brandId)) {
    notFound()
  }

  const brand = await getBrand(brandId)

  if (!brand) {
    notFound()
  }

  return <BrandForm brand={brand} isEdit={true} />
}
