import { notFound } from 'next/navigation'
import { prisma } from '../../../../../../lib/prisma'
import BrandForm from '../../BrandForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getBrand(id: number) {
  return await prisma.brand.findUnique({
    where: { id }
  })
}

export default async function EditBrandPage({ params }: PageProps) {
  const { id } = await params
  const brandId = parseInt(id)
  
  if (isNaN(brandId)) {
    notFound()
  }

  const brand = await getBrand(brandId)

  if (!brand) {
    notFound()
  }

  return <BrandForm brand={brand} isEdit={true} />
}
