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

  // Seed Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'nike' },
      update: {},
      create: {
        name: 'Nike',
        slug: 'nike',
        description: 'Just Do It - Global sportswear brand',
        website: 'https://www.nike.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'adidas' },
      update: {},
      create: {
        name: 'Adidas',
        slug: 'adidas',
        description: 'Impossible is Nothing - German sportswear brand',
        website: 'https://www.adidas.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'converse' },
      update: {},
      create: {
        name: 'Converse',
        slug: 'converse',
        description: 'Classic sneakers and lifestyle brand',
        website: 'https://www.converse.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'zara' },
      update: {},
      create: {
        name: 'Zara',
        slug: 'zara',
        description: 'Fashion-forward footwear and clothing',
        website: 'https://www.zara.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'hm' },
      update: {},
      create: {
        name: 'H&M',
        slug: 'hm',
        description: 'Affordable fashion for everyone',
        website: 'https://www.hm.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'mango' },
      update: {},
      create: {
        name: 'Mango',
        slug: 'mango',
        description: 'Contemporary fashion brand',
        website: 'https://www.mango.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'charles-keith' },
      update: {},
      create: {
        name: 'Charles & Keith',
        slug: 'charles-keith',
        description: 'Singapore luxury accessories brand',
        website: 'https://www.charleskeith.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'pedro' },
      update: {},
      create: {
        name: 'Pedro',
        slug: 'pedro',
        description: 'Contemporary footwear and accessories',
        website: 'https://www.pedro.com'
      }
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

  // Create sample products for pagination testing
  const products = [
    {
      name: 'Elegant Rose Gold Heels',
      slug: 'elegant-rose-gold-heels',
      description: 'Sepatu hak tinggi dengan finishing rose gold yang mewah',
      price: 850000,
      originalPrice: 1200000,
      isOnSale: true,
      category: 'high-heels',
      colors: ['Rose Gold', 'Gold'],
      image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop'
    },
    {
      name: 'Classic Black Sneakers',
      slug: 'classic-black-sneakers',
      description: 'Sneakers hitam klasik untuk sehari-hari',
      price: 450000,
      originalPrice: 550000,
      isOnSale: true,
      category: 'sneakers',
      colors: ['Black', 'White'],
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    },
    {
      name: 'Comfortable Brown Flats',
      slug: 'comfortable-brown-flats',
      description: 'Sepatu flat coklat yang nyaman untuk bekerja',
      price: 320000,
      originalPrice: null,
      isOnSale: false,
      category: 'flats',
      colors: ['Brown', 'Nude'],
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop'
    },
    {
      name: 'Stylish Black Boots',
      slug: 'stylish-black-boots',
      description: 'Boots hitam stylish untuk musim dingin',
      price: 780000,
      originalPrice: 950000,
      isOnSale: true,
      category: 'boots',
      colors: ['Black', 'Brown'],
      image: 'https://images.unsplash.com/photo-1608256246200-53e8b47b90fb?w=400&h=400&fit=crop'
    },
    {
      name: 'Summer Pink Sandals',
      slug: 'summer-pink-sandals',
      description: 'Sandal pink untuk liburan musim panas',
      price: 280000,
      originalPrice: null,
      isOnSale: false,
      category: 'sandals',
      colors: ['Pink', 'White'],
      image: 'https://images.unsplash.com/photo-1594618378082-0e69b9c0bf27?w=400&h=400&fit=crop'
    },
    {
      name: 'White Designer Heels',
      slug: 'white-designer-heels',
      description: 'Sepatu hak tinggi putih untuk acara formal',
      price: 920000,
      originalPrice: null,
      isOnSale: false,
      category: 'high-heels',
      colors: ['White', 'Silver'],
      image: 'https://images.unsplash.com/photo-1596702673151-1a7cec24e7b7?w=400&h=400&fit=crop'
    },
    {
      name: 'Sports Running Shoes',
      slug: 'sports-running-shoes',
      description: 'Sepatu lari untuk olahraga dan aktivitas outdoor',
      price: 680000,
      originalPrice: 750000,
      isOnSale: true,
      category: 'sneakers',
      colors: ['Black', 'White'],
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop'
    },
    {
      name: 'Nude Office Flats',
      slug: 'nude-office-flats',
      description: 'Sepatu flat nude untuk kantor',
      price: 380000,
      originalPrice: null,
      isOnSale: false,
      category: 'flats',
      colors: ['Nude', 'Brown'],
      image: 'https://images.unsplash.com/photo-1502391709512-fde5963d88a5?w=400&h=400&fit=crop'
    },
    {
      name: 'Winter Brown Boots',
      slug: 'winter-brown-boots',
      description: 'Boots coklat hangat untuk musim dingin',
      price: 850000,
      originalPrice: null,
      isOnSale: false,
      category: 'boots',
      colors: ['Brown', 'Black'],
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop'
    },
    {
      name: 'Beach Silver Sandals',
      slug: 'beach-silver-sandals',
      description: 'Sandal silver untuk pantai dan rekreasi',
      price: 250000,
      originalPrice: 320000,
      isOnSale: true,
      category: 'sandals',
      colors: ['Silver', 'Gold'],
      image: 'https://images.unsplash.com/photo-1564969993608-b8b0e5b0e0e6?w=400&h=400&fit=crop'
    },
    {
      name: 'Red Glamour Heels',
      slug: 'red-glamour-heels',
      description: 'Sepatu hak tinggi merah untuk pesta',
      price: 1150000,
      originalPrice: null,
      isOnSale: false,
      category: 'high-heels',
      colors: ['Rose Gold', 'Gold'],
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop'
    },
    {
      name: 'Casual White Sneakers',
      slug: 'casual-white-sneakers',
      description: 'Sneakers putih casual untuk gaya santai',
      price: 420000,
      originalPrice: 480000,
      isOnSale: true,
      category: 'sneakers',
      colors: ['White', 'Silver'],
      image: 'https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?w=400&h=400&fit=crop'
    },
    {
      name: 'Black Professional Flats',
      slug: 'black-professional-flats',
      description: 'Sepatu flat hitam profesional',
      price: 350000,
      originalPrice: null,
      isOnSale: false,
      category: 'flats',
      colors: ['Black', 'Brown'],
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop'
    },
    {
      name: 'Hiking Adventure Boots',
      slug: 'hiking-adventure-boots',
      description: 'Boots untuk hiking dan petualangan',
      price: 980000,
      originalPrice: 1200000,
      isOnSale: true,
      category: 'boots',
      colors: ['Brown', 'Black'],
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop'
    },
    {
      name: 'Gold Luxury Sandals',
      slug: 'gold-luxury-sandals',
      description: 'Sandal emas mewah untuk acara khusus',
      price: 680000,
      originalPrice: null,
      isOnSale: false,
      category: 'sandals',
      colors: ['Gold', 'Silver'],
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'
    },
    {
      name: 'Purple Evening Heels',
      slug: 'purple-evening-heels',
      description: 'Sepatu hak tinggi ungu untuk malam hari',
      price: 890000,
      originalPrice: 1050000,
      isOnSale: true,
      category: 'high-heels',
      colors: ['Pink', 'Rose Gold'],
      image: 'https://images.unsplash.com/photo-1506629905851-d6633b4417b1?w=400&h=400&fit=crop'
    },
    {
      name: 'Street Style Sneakers',
      slug: 'street-style-sneakers',
      description: 'Sneakers bergaya street untuk anak muda',
      price: 520000,
      originalPrice: null,
      isOnSale: false,
      category: 'sneakers',
      colors: ['Black', 'White'],
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop'
    },
    {
      name: 'Elegant Beige Flats',
      slug: 'elegant-beige-flats',
      description: 'Sepatu flat beige elegan untuk formal',
      price: 420000,
      originalPrice: null,
      isOnSale: false,
      category: 'flats',
      colors: ['Nude', 'Brown'],
      image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop'
    },
    {
      name: 'Combat Style Boots',
      slug: 'combat-style-boots',
      description: 'Boots gaya combat untuk tampilan edgy',
      price: 720000,
      originalPrice: 850000,
      isOnSale: true,
      category: 'boots',
      colors: ['Black', 'Brown'],
      image: 'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=400&h=400&fit=crop'
    },
    {
      name: 'Bohemian Leather Sandals',
      slug: 'bohemian-leather-sandals',
      description: 'Sandal kulit bergaya bohemian',
      price: 350000,
      originalPrice: null,
      isOnSale: false,
      category: 'sandals',
      colors: ['Brown', 'Nude'],
      image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop'
    },
    {
      name: 'Metallic Silver Heels',
      slug: 'metallic-silver-heels',
      description: 'Sepatu hak tinggi metallic silver',
      price: 750000,
      originalPrice: 920000,
      isOnSale: true,
      category: 'high-heels',
      colors: ['Silver', 'Gold'],
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop'
    },
    {
      name: 'Retro Canvas Sneakers',
      slug: 'retro-canvas-sneakers',
      description: 'Sneakers kanvas retro untuk gaya vintage',
      price: 380000,
      originalPrice: 450000,
      isOnSale: true,
      category: 'sneakers',
      colors: ['White', 'Black'],
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop'
    },
    {
      name: 'Pointed Toe Flats',
      slug: 'pointed-toe-flats',
      description: 'Sepatu flat ujung runcing untuk gaya modern',
      price: 480000,
      originalPrice: null,
      isOnSale: false,
      category: 'flats',
      colors: ['Black', 'Nude'],
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop'
    },
    {
      name: 'Luxury Ankle Boots',
      slug: 'luxury-ankle-boots',
      description: 'Ankle boots mewah untuk fashion statement',
      price: 1200000,
      originalPrice: null,
      isOnSale: false,
      category: 'boots',
      colors: ['Black', 'Brown'],
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'
    },
    {
      name: 'Tropical Print Sandals',
      slug: 'tropical-print-sandals',
      description: 'Sandal motif tropical untuk liburan',
      price: 320000,
      originalPrice: 380000,
      isOnSale: true,
      category: 'sandals',
      colors: ['Pink', 'White'],
      image: 'https://images.unsplash.com/photo-1593187315802-4a09e6618dd0?w=400&h=400&fit=crop'
    }
  ]

  console.log('Creating sample products...')

  for (const productData of products) {
    const category = categories.find(c => c.slug === productData.category)!
    const productColors = productData.colors.map(colorName =>
      colors.find(c => c.name === colorName)!.id
    )

    await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        originalPrice: productData.originalPrice,
        isOnSale: productData.isOnSale,
        categoryId: category.id,
        images: {
          create: [
            {
              url: productData.image,
              altText: productData.name,
              isPrimary: true,
              order: 1
            }
          ]
        },
        colors: {
          create: productColors.map(colorId => ({ colorId }))
        },
        sizes: {
          create: [
            { sizeId: sizes.find(s => s.value === 36)!.id, stock: Math.floor(Math.random() * 10) + 1 },
            { sizeId: sizes.find(s => s.value === 37)!.id, stock: Math.floor(Math.random() * 10) + 1 },
            { sizeId: sizes.find(s => s.value === 38)!.id, stock: Math.floor(Math.random() * 10) + 1 },
            { sizeId: sizes.find(s => s.value === 39)!.id, stock: Math.floor(Math.random() * 10) + 1 },
            { sizeId: sizes.find(s => s.value === 40)!.id, stock: Math.floor(Math.random() * 10) + 1 }
          ]
        }
      }
    })
  }

  console.log('Database seeded successfully!')
  console.log('Categories:', categories.length)
  console.log('Colors:', colors.length)
  console.log('Sizes:', sizes.length)
  console.log('Admin created:', admin.email)
  console.log('Sample products created:', products.length)
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
