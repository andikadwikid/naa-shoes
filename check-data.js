const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkData() {
  try {
    // Cek brands
    const brands = await prisma.brand.findMany({
      select: { id: true, name: true, slug: true }
    })
    console.log('=== BRANDS ===')
    brands.forEach(brand => {
      console.log(`ID: ${brand.id}, Name: ${brand.name}, Slug: ${brand.slug}`)
    })

    console.log('\n=== PRODUCTS WITH BRANDS ===')
    // Cek products dengan brand
    const products = await prisma.product.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        brandId: true,
        brand: {
          select: { name: true }
        }
      }
    })
    
    products.forEach(product => {
      console.log(`Product ID: ${product.id}, Name: ${product.name}, BrandID: ${product.brandId}, Brand: ${product.brand?.name || 'null'}`)
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
