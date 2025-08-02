import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'sneakers' },
      update: {},
      create: {
        name: 'Sneakers',
        slug: 'sneakers',
        description: 'Sepatu sneakers casual dan olahraga'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'high-heels' },
      update: {},
      create: {
        name: 'High Heels',
        slug: 'high-heels',
        description: 'Sepatu hak tinggi untuk acara formal dan semi-formal'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'flats' },
      update: {},
      create: {
        name: 'Flats',
        slug: 'flats',
        description: 'Sepatu flat nyaman untuk sehari-hari'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'boots' },
      update: {},
      create: {
        name: 'Boots',
        slug: 'boots',
        description: 'Sepatu boots untuk cuaca dingin dan gaya kasual'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sandals' },
      update: {},
      create: {
        name: 'Sandals',
        slug: 'sandals',
        description: 'Sandal untuk cuaca panas dan santai'
      }
    })
  ])

  // Seed Colors
  const colors = await Promise.all([
    prisma.color.upsert({
      where: { name: 'Black' },
      update: {},
      create: { name: 'Black', hexCode: '#000000' }
    }),
    prisma.color.upsert({
      where: { name: 'White' },
      update: {},
      create: { name: 'White', hexCode: '#FFFFFF' }
    }),
    prisma.color.upsert({
      where: { name: 'Pink' },
      update: {},
      create: { name: 'Pink', hexCode: '#EC4899' }
    }),
    prisma.color.upsert({
      where: { name: 'Rose Gold' },
      update: {},
      create: { name: 'Rose Gold', hexCode: '#E11D48' }
    }),
    prisma.color.upsert({
      where: { name: 'Nude' },
      update: {},
      create: { name: 'Nude', hexCode: '#D4A574' }
    }),
    prisma.color.upsert({
      where: { name: 'Brown' },
      update: {},
      create: { name: 'Brown', hexCode: '#92400E' }
    }),
    prisma.color.upsert({
      where: { name: 'Silver' },
      update: {},
      create: { name: 'Silver', hexCode: '#9CA3AF' }
    }),
    prisma.color.upsert({
      where: { name: 'Gold' },
      update: {},
      create: { name: 'Gold', hexCode: '#FBBF24' }
    })
  ])

  // Seed Sizes
  const sizes = await Promise.all([
    ...Array.from({ length: 10 }, (_, i) => {
      const sizeValue = 36 + i; // 36-45
      return prisma.size.upsert({
        where: { value: sizeValue },
        update: {},
        create: { value: sizeValue }
      })
    })
  ])

  // Create sample admin user
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@naashoes.com' },
    update: {},
    create: {
      email: 'admin@naashoes.com',
      name: 'NAA Admin',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'password' (hashed)
      role: 'SUPER_ADMIN'
    }
  })

  // Create some sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'Elegant Rose Gold Heels',
      slug: 'elegant-rose-gold-heels',
      description: 'Sepatu hak tinggi dengan finishing rose gold yang mewah',
      price: 850000,
      originalPrice: 1200000,
      isOnSale: true,
      categoryId: categories.find(c => c.slug === 'high-heels')!.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
            altText: 'Elegant Rose Gold Heels',
            isPrimary: true,
            order: 1
          }
        ]
      },
      colors: {
        create: [
          { colorId: colors.find(c => c.name === 'Rose Gold')!.id },
          { colorId: colors.find(c => c.name === 'Gold')!.id }
        ]
      },
      sizes: {
        create: [
          { sizeId: sizes.find(s => s.value === 36)!.id, stock: 5 },
          { sizeId: sizes.find(s => s.value === 37)!.id, stock: 8 },
          { sizeId: sizes.find(s => s.value === 38)!.id, stock: 10 },
          { sizeId: sizes.find(s => s.value === 39)!.id, stock: 7 },
          { sizeId: sizes.find(s => s.value === 40)!.id, stock: 3 }
        ]
      }
    }
  })

  console.log('Database seeded successfully!')
  console.log('Categories:', categories.length)
  console.log('Colors:', colors.length)
  console.log('Sizes:', sizes.length)
  console.log('Admin created:', admin.email)
  console.log('Sample product created:', product1.name)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
