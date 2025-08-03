import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Helper function to generate random integer between min and max
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  // Helper function to generate size guide in centimeters
  const getSizeGuide = (euSize: number): number => {
    // EU shoe size formula: (EU Size - 2) / 1.5 = foot length in cm
    return parseFloat(((euSize - 2) / 1.5).toFixed(1))
  }

  // Create categories
  console.log('📂 Creating categories...')
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'heels' },
      update: {},
      create: {
        name: 'Heels',
        slug: 'heels',
        description: 'Elegant high heels for every occasion'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sneakers' },
      update: {},
      create: {
        name: 'Sneakers',
        slug: 'sneakers',
        description: 'Comfortable and stylish sneakers'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'boots' },
      update: {},
      create: {
        name: 'Boots',
        slug: 'boots',
        description: 'Stylish boots for all seasons'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'flats' },
      update: {},
      create: {
        name: 'Flats',
        slug: 'flats',
        description: 'Comfortable flat shoes for daily wear'
      }
    })
  ])

  // Create brands
  console.log('🏷️ Creating brands...')
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'elegante' },
      update: {},
      create: {
        name: 'Elegante',
        slug: 'elegante',
        description: 'Premium women\'s footwear',
        website: 'https://elegante.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'comfort-plus' },
      update: {},
      create: {
        name: 'Comfort Plus',
        slug: 'comfort-plus',
        description: 'Comfort-focused shoe designs',
        website: 'https://comfortplus.com'
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'urban-chic' },
      update: {},
      create: {
        name: 'Urban Chic',
        slug: 'urban-chic',
        description: 'Modern urban fashion footwear',
        website: 'https://urbanchic.com'
      }
    })
  ])

  // Create colors
  console.log('🎨 Creating colors...')
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
      where: { name: 'Brown' },
      update: {},
      create: { name: 'Brown', hexCode: '#8B4513' }
    }),
    prisma.color.upsert({
      where: { name: 'Nude' },
      update: {},
      create: { name: 'Nude', hexCode: '#E8C5A0' }
    }),
    prisma.color.upsert({
      where: { name: 'Navy' },
      update: {},
      create: { name: 'Navy', hexCode: '#001f3f' }
    }),
    prisma.color.upsert({
      where: { name: 'Red' },
      update: {},
      create: { name: 'Red', hexCode: '#DC143C' }
    }),
    prisma.color.upsert({
      where: { name: 'Pink' },
      update: {},
      create: { name: 'Pink', hexCode: '#FFC0CB' }
    }),
    prisma.color.upsert({
      where: { name: 'Gold' },
      update: {},
      create: { name: 'Gold', hexCode: '#FFD700' }
    })
  ])

  // Create sizes (EU sizing: 35-42)
  console.log('📏 Creating sizes...')
  const sizes = await Promise.all(
    Array.from({ length: 8 }, (_, i) => {
      const size = 35 + i
      return prisma.size.upsert({
        where: { value: size },
        update: {},
        create: { value: size }
      })
    })
  )

  // Create customers
  console.log('👥 Creating customers...')
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: 'sarah.johnson@email.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+62-812-3456-7890'
      }
    }),
    prisma.customer.upsert({
      where: { email: 'lisa.anderson@email.com' },
      update: {},
      create: {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        phone: '+62-813-2468-1357'
      }
    }),
    prisma.customer.upsert({
      where: { email: 'maria.garcia@email.com' },
      update: {},
      create: {
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+62-814-1357-2468'
      }
    })
  ])

  // Create products with inventory
  console.log('👠 Creating products with inventory...')
  
  const productData = [
    {
      name: 'Classic Black Pumps',
      description: 'Timeless black pumps perfect for office and formal occasions. Made with premium leather and comfortable heel height.',
      price: 899000,
      originalPrice: 1299000,
      categoryId: categories[0].id, // Heels
      brandId: brands[0].id, // Elegante
      material: 'Genuine Leather',
      weight: 450,
      isNew: false,
      isOnSale: true,
      colors: [0, 1, 3], // Black, White, Nude
      availableSizes: [0, 1, 2, 3, 4, 5] // 35-40
    },
    {
      name: 'Comfort Walking Sneakers',
      description: 'Ultra-comfortable sneakers designed for all-day wear. Features breathable mesh and cushioned sole.',
      price: 649000,
      originalPrice: null,
      categoryId: categories[1].id, // Sneakers
      brandId: brands[1].id, // Comfort Plus
      material: 'Mesh and Synthetic',
      weight: 320,
      isNew: true,
      isOnSale: false,
      colors: [0, 1, 4], // Black, White, Navy
      availableSizes: [0, 1, 2, 3, 4, 5, 6] // 35-41
    },
    {
      name: 'Elegant Ankle Boots',
      description: 'Stylish ankle boots with side zipper. Perfect for both casual and dressy looks.',
      price: 1299000,
      originalPrice: null,
      categoryId: categories[2].id, // Boots
      brandId: brands[2].id, // Urban Chic
      material: 'Suede and Leather',
      weight: 680,
      isNew: true,
      isOnSale: false,
      colors: [0, 2, 4], // Black, Brown, Navy
      availableSizes: [1, 2, 3, 4, 5] // 36-40
    },
    {
      name: 'Ballet Flats',
      description: 'Classic ballet flats with pointed toe. Comfortable and versatile for everyday wear.',
      price: 449000,
      originalPrice: 599000,
      categoryId: categories[3].id, // Flats
      brandId: brands[0].id, // Elegante
      material: 'Soft Leather',
      weight: 250,
      isNew: false,
      isOnSale: true,
      colors: [0, 3, 6], // Black, Nude, Pink
      availableSizes: [0, 1, 2, 3, 4, 5, 6] // 35-41
    },
    {
      name: 'Red Sole High Heels',
      description: 'Glamorous high heels with signature red sole. Perfect for special occasions and evening events.',
      price: 1899000,
      originalPrice: null,
      categoryId: categories[0].id, // Heels
      brandId: brands[2].id, // Urban Chic
      material: 'Patent Leather',
      weight: 520,
      isNew: true,
      isOnSale: false,
      colors: [0, 5, 7], // Black, Red, Gold
      availableSizes: [1, 2, 3, 4, 5] // 36-40
    },
    {
      name: 'Platform Sneakers',
      description: 'Trendy platform sneakers with thick sole. Adds height while maintaining comfort.',
      price: 749000,
      originalPrice: 899000,
      categoryId: categories[1].id, // Sneakers
      brandId: brands[2].id, // Urban Chic
      material: 'Canvas and Rubber',
      weight: 480,
      isNew: false,
      isOnSale: true,
      colors: [0, 1, 6], // Black, White, Pink
      availableSizes: [0, 1, 2, 3, 4, 5] // 35-40
    },
    {
      name: 'Chelsea Boots',
      description: 'Classic Chelsea boots with elastic side panels. Versatile and easy to slip on.',
      price: 1149000,
      originalPrice: null,
      categoryId: categories[2].id, // Boots
      brandId: brands[1].id, // Comfort Plus
      material: 'Genuine Leather',
      weight: 590,
      isNew: false,
      isOnSale: false,
      colors: [0, 2], // Black, Brown
      availableSizes: [2, 3, 4, 5, 6] // 37-41
    },
    {
      name: 'Summer Sandal Flats',
      description: 'Breathable summer flats with open design. Perfect for warm weather and casual outings.',
      price: 349000,
      originalPrice: 449000,
      categoryId: categories[3].id, // Flats
      brandId: brands[1].id, // Comfort Plus
      material: 'Synthetic and Fabric',
      weight: 180,
      isNew: false,
      isOnSale: true,
      colors: [3, 6, 7], // Nude, Pink, Gold
      availableSizes: [0, 1, 2, 3, 4, 5, 6, 7] // 35-42
    }
  ]

  for (const [index, data] of productData.entries()) {
    console.log(`  Creating product ${index + 1}: ${data.name}`)
    
    const slug = data.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Create product
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice,
        categoryId: data.categoryId,
        brandId: data.brandId,
        material: data.material,
        weight: data.weight,
        isNew: data.isNew,
        isOnSale: data.isOnSale,
        thumbnailUrl: `/images/products/product-${index + 1}-thumb.jpg`
      }
    })

    // Create gallery images
    const galleryImages = Array.from({ length: 3 }, (_, imgIndex) => ({
      productId: product.id,
      url: `/images/products/product-${index + 1}-${imgIndex + 1}.jpg`,
      altText: `${data.name} - View ${imgIndex + 1}`,
      displayOrder: imgIndex
    }))

    await prisma.productImage.createMany({
      data: galleryImages,
      skipDuplicates: true
    })

    // Create size guides for available sizes
    const sizeGuidesData = data.availableSizes.map(sizeIndex => ({
      productId: product.id,
      sizeId: sizes[sizeIndex].id,
      centimeters: getSizeGuide(sizes[sizeIndex].value)
    }))

    await prisma.sizeGuide.createMany({
      data: sizeGuidesData,
      skipDuplicates: true
    })

    // Create product inventories (color-size-stock combinations)
    const inventoryData = []
    for (const colorIndex of data.colors) {
      for (const sizeIndex of data.availableSizes) {
        const stock = randomInt(0, 15) // Random stock between 0-15
        if (stock > 0) { // Only create entries with stock > 0
          inventoryData.push({
            productId: product.id,
            colorId: colors[colorIndex].id,
            sizeId: sizes[sizeIndex].id,
            stock
          })
        }
      }
    }

    await prisma.productInventory.createMany({
      data: inventoryData,
      skipDuplicates: true
    })

    console.log(`    ✅ Created ${inventoryData.length} inventory entries`)
  }

  // Create blog categories and authors
  console.log('📝 Creating blog content...')
  
  const blogCategories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'fashion-trends' },
      update: {},
      create: {
        name: 'Fashion Trends',
        slug: 'fashion-trends',
        description: 'Latest fashion trends and style tips'
      }
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'shoe-care' },
      update: {},
      create: {
        name: 'Shoe Care',
        slug: 'shoe-care',
        description: 'Tips for maintaining and caring for your shoes'
      }
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'style-guide' },
      update: {},
      create: {
        name: 'Style Guide',
        slug: 'style-guide',
        description: 'Style guides and fashion advice'
      }
    })
  ])

  const authors = await Promise.all([
    prisma.author.upsert({
      where: { email: 'emily.style@example.com' },
      update: {},
      create: {
        name: 'Emily Chen',
        email: 'emily.style@example.com',
        bio: 'Fashion stylist and footwear expert with 10+ years of experience',
        avatar: '/images/authors/emily-chen.jpg'
      }
    }),
    prisma.author.upsert({
      where: { email: 'sophia.fashion@example.com' },
      update: {},
      create: {
        name: 'Sophia Rodriguez',
        email: 'sophia.fashion@example.com',
        bio: 'Fashion blogger and style consultant specializing in women\'s footwear',
        avatar: '/images/authors/sophia-rodriguez.jpg'
      }
    })
  ])

  // Create blog posts
  const blogPosts = [
    {
      title: '2024 Spring Shoe Trends: What\'s Hot This Season',
      slug: '2024-spring-shoe-trends',
      excerpt: 'Discover the hottest shoe trends for Spring 2024, from chunky sneakers to elegant kitten heels.',
      content: 'Spring 2024 brings exciting new trends in women\'s footwear. This season, we\'re seeing a return to comfort-focused designs without sacrificing style...',
      authorId: authors[0].id,
      blogCategoryId: blogCategories[0].id,
      isPublished: true,
      isFeatured: true,
      readTime: 5
    },
    {
      title: 'How to Care for Your Leather Shoes: A Complete Guide',
      slug: 'leather-shoe-care-guide',
      excerpt: 'Learn professional tips for maintaining your leather shoes and extending their lifespan.',
      content: 'Proper care of leather shoes is essential for maintaining their appearance and durability. Here\'s a comprehensive guide...',
      authorId: authors[1].id,
      blogCategoryId: blogCategories[1].id,
      isPublished: true,
      isFeatured: false,
      readTime: 8
    },
    {
      title: 'Choosing the Perfect Heel Height for Your Lifestyle',
      slug: 'perfect-heel-height-guide',
      excerpt: 'Find the ideal heel height that balances comfort and style for your daily activities.',
      content: 'The right heel height can make all the difference in your comfort and confidence. Consider these factors...',
      authorId: authors[0].id,
      blogCategoryId: blogCategories[2].id,
      isPublished: true,
      isFeatured: true,
      readTime: 6
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        image: `/images/blog/${post.slug}.jpg`,
        publishedAt: new Date()
      }
    })
  }

  // Create some sample orders
  console.log('🛒 Creating sample orders...')
  
  const orders = [
    {
      customerId: customers[0].id,
      orderNumber: 'ORD-2024-001',
      status: 'DELIVERED' as any,
      totalAmount: 899000,
      shippingCost: 25000,
      shippingAddress: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta',
      items: [
        { productId: 1, quantity: 1, price: 899000, size: 38, color: 'Black' }
      ]
    },
    {
      customerId: customers[1].id,
      orderNumber: 'ORD-2024-002',
      status: 'SHIPPED' as any,
      totalAmount: 1348000,
      shippingCost: 25000,
      shippingAddress: 'Jl. Gatot Subroto No. 456, Bandung, Jawa Barat',
      items: [
        { productId: 2, quantity: 1, price: 649000, size: 37, color: 'White' },
        { productId: 4, quantity: 1, price: 449000, size: 38, color: 'Nude' }
      ]
    }
  ]

  for (const orderData of orders) {
    const { items, ...orderFields } = orderData
    
    const order = await prisma.order.upsert({
      where: { orderNumber: orderData.orderNumber },
      update: {},
      create: orderFields
    })

    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          ...item,
          orderId: order.id
        }
      })
    }
  }

  console.log('✨ Database seeding completed successfully!')
  
  // Print summary
  const productCount = await prisma.product.count()
  const inventoryCount = await prisma.productInventory.count()
  const totalStock = await prisma.productInventory.aggregate({
    _sum: { stock: true }
  })
  
  console.log(`📊 Summary:`)
  console.log(`   Products: ${productCount}`)
  console.log(`   Inventory entries: ${inventoryCount}`)
  console.log(`   Total stock units: ${totalStock._sum.stock}`)
  console.log(`   Categories: ${categories.length}`)
  console.log(`   Brands: ${brands.length}`)
  console.log(`   Colors: ${colors.length}`)
  console.log(`   Sizes: ${sizes.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
