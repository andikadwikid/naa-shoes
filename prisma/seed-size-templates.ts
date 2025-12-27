import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding size templates...')

  // Helper function to calculate standard EU size guide
  const calculateStandardSizeGuide = (euSize: number): number => {
    return parseFloat(((euSize - 2) / 1.5).toFixed(1))
  }

  // Get all available sizes
  const sizes = await prisma.size.findMany({
    orderBy: { value: 'asc' }
  })

  if (sizes.length === 0) {
    console.log('❌ No sizes found. Please run the main seeder first.')
    return
  }

  // Template configurations
  const templates = [
    {
      name: 'Standard EU Sizing',
      description: 'Standard European sizing formula: (EU Size - 2) ÷ 1.5',
      category: null,
      isDefault: true,
      adjustment: 0
    },
    {
      name: 'High Heels Sizing',
      description: 'Optimized for high heels - slightly smaller for better fit',
      category: 'heels',
      isDefault: false,
      adjustment: -0.1
    },
    {
      name: 'Sneakers Sizing',
      description: 'Sneakers sizing - slightly larger for comfort during activities',
      category: 'sneakers',
      isDefault: false,
      adjustment: 0.2
    },
    {
      name: 'Boots Sizing',
      description: 'Standard sizing for boots with good ankle support',
      category: 'boots',
      isDefault: false,
      adjustment: 0
    },
    {
      name: 'Narrow Fit',
      description: 'For narrow feet - 0.2cm smaller than standard',
      category: null,
      isDefault: false,
      adjustment: -0.2
    },
    {
      name: 'Wide Fit',
      description: 'For wider feet - 0.3cm larger than standard',
      category: null,
      isDefault: false,
      adjustment: 0.3
    }
  ]

  for (const templateConfig of templates) {
    console.log(`  Creating template: ${templateConfig.name}`)
    
    // Create the template
    const template = await prisma.sizeTemplate.upsert({
      where: { name: templateConfig.name },
      update: {},
      create: {
        name: templateConfig.name,
        description: templateConfig.description,
        category: templateConfig.category,
        isDefault: templateConfig.isDefault
      }
    })

    // Create size template items for all sizes
    const sizeTemplateItems = sizes.map(size => {
      const standardValue = calculateStandardSizeGuide(size.value)
      const adjustedValue = parseFloat((standardValue + templateConfig.adjustment).toFixed(1))
      
      return {
        sizeTemplateId: template.id,
        sizeId: size.id,
        centimeters: adjustedValue
      }
    })

    // Delete existing items first (in case of re-run)
    await prisma.sizeTemplateItem.deleteMany({
      where: { sizeTemplateId: template.id }
    })

    // Create new items
    await prisma.sizeTemplateItem.createMany({
      data: sizeTemplateItems,
      skipDuplicates: true
    })

    console.log(`    ✅ Created ${sizeTemplateItems.length} size entries`)
  }

  // Display summary
  const templateCount = await prisma.sizeTemplate.count()
  const itemCount = await prisma.sizeTemplateItem.count()
  
  console.log(`\n📊 Size Templates Summary:`)
  console.log(`   Templates: ${templateCount}`)
  console.log(`   Total size entries: ${itemCount}`)
  
  // Show sample data for verification
  const defaultTemplate = await prisma.sizeTemplate.findFirst({
    where: { isDefault: true },
    include: {
      sizeTemplateItems: {
        include: { size: true },
        orderBy: { size: { value: 'asc' } },
        take: 5
      }
    }
  })

  if (defaultTemplate) {
    console.log(`\n📏 Sample from "${defaultTemplate.name}":`)
    defaultTemplate.sizeTemplateItems.forEach(item => {
      console.log(`   Size ${item.size.value}: ${item.centimeters} cm`)
    })
  }

  console.log('\n✨ Size templates seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding size templates:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
