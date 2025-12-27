import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function verifyData() {
  console.log('🔍 Verifying seeded data...\n')

  try {
    // Check categories
    const categories = await prisma.category.findMany()
    console.log(`📂 Categories (${categories.length}):`)
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`))

    // Check brands
    const brands = await prisma.brand.findMany()
    console.log(`\n🏷️ Brands (${brands.length}):`)
    brands.forEach(brand => console.log(`   - ${brand.name} (${brand.slug})`))

    // Check colors
    const colors = await prisma.color.findMany()
    console.log(`\n🎨 Colors (${colors.length}):`)
    colors.forEach(color => console.log(`   - ${color.name} (${color.hexCode})`))

    // Check sizes
    const sizes = await prisma.size.findMany()
    console.log(`\n📏 Sizes (${sizes.length}):`)
    sizes.forEach(size => console.log(`   - Size ${size.value}`))

    // Check products with relations
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        productInventories: { 
          include: { 
            color: true,
            size: true 
          } 
        },
        sizeGuides: { include: { size: true } }
      }
    })

    console.log(`\n👠 Products (${products.length}):`)
    products.forEach(product => {
      const totalStock = product.productInventories.reduce((sum, inv) => sum + inv.stock, 0)
      const uniqueColors = [...new Set(product.productInventories.map(inv => inv.color.name))]
      const uniqueSizes = [...new Set(product.productInventories.map(inv => inv.size.value))]
      const sizeGuideCount = product.sizeGuides.length
      
      console.log(`   - ${product.name}`)
      console.log(`     Category: ${product.category.name} | Brand: ${product.brand?.name || 'No brand'}`)
      console.log(`     Colors: ${uniqueColors.length} (${uniqueColors.join(', ')})`)
      console.log(`     Sizes: ${uniqueSizes.length} (${uniqueSizes.sort((a, b) => a - b).join(', ')})`)
      console.log(`     Total Stock: ${totalStock} units`)
      console.log(`     Inventory Entries: ${product.productInventories.length}`)
      console.log(`     Size Guide: ${sizeGuideCount} configured`)
      console.log(`     Price: Rp ${product.price.toLocaleString('id-ID')}`)
      console.log('')
    })

    // Sample inventory detail
    if (products.length > 0) {
      const sampleProduct = products[0]
      console.log(`📋 Sample Inventory Detail (${sampleProduct.name}):`)
      
      // Group by color
      const colorGroups = [...new Set(sampleProduct.productInventories.map(inv => inv.color.name))]
      colorGroups.forEach(colorName => {
        const colorInventories = sampleProduct.productInventories.filter(inv => inv.color.name === colorName)
        const totalColorStock = colorInventories.reduce((sum, inv) => sum + inv.stock, 0)
        console.log(`   - ${colorName} (Total: ${totalColorStock} units):`)
        colorInventories.forEach(inv => {
          console.log(`     • Size ${inv.size.value}: ${inv.stock} units`)
        })
      })

      console.log(`\n📏 Sample Size Guide Detail (${sampleProduct.name}):`)
      sampleProduct.sizeGuides.forEach(sg => {
        console.log(`   - Size ${sg.size.value}: ${sg.centimeters} cm`)
      })
    }

    // Total stock across all products
    const totalInventoryEntries = await prisma.productInventory.count()
    const totalStockData = await prisma.productInventory.aggregate({
      _sum: { stock: true }
    })

    console.log(`\n📊 Inventory Summary:`)
    console.log(`   - Total inventory entries: ${totalInventoryEntries}`)
    console.log(`   - Total stock units: ${totalStockData._sum.stock}`)

    console.log('\n✅ Data verification completed successfully!')

  } catch (error) {
    console.error('❌ Error verifying data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyData()
