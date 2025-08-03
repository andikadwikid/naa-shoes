import { PrismaClient } from "@/app/generated/prisma";
import { existsSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function cleanupBrokenImages() {
  console.log('🔍 Checking for broken image references...');
  
  // Check product thumbnails
  const productsWithThumbnails = await prisma.product.findMany({
    where: {
      thumbnailUrl: {
        not: null
      }
    },
    select: {
      id: true,
      name: true,
      thumbnailUrl: true
    }
  });

  const brokenThumbnails = [];
  for (const product of productsWithThumbnails) {
    if (product.thumbnailUrl) {
      const imagePath = join(process.cwd(), 'public', product.thumbnailUrl);
      if (!existsSync(imagePath)) {
        brokenThumbnails.push(product);
        console.log(`❌ Broken thumbnail: ${product.name} -> ${product.thumbnailUrl}`);
      }
    }
  }

  // Check gallery images
  const galleryImages = await prisma.productImage.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  const brokenGalleryImages = [];
  for (const image of galleryImages) {
    const imagePath = join(process.cwd(), 'public', image.url);
    if (!existsSync(imagePath)) {
      brokenGalleryImages.push(image);
      console.log(`❌ Broken gallery image: ${image.product.name} -> ${image.url}`);
    }
  }

  console.log(`\n📊 Found ${brokenThumbnails.length} broken thumbnails and ${brokenGalleryImages.length} broken gallery images`);

  // Clean up broken references
  if (brokenThumbnails.length > 0) {
    console.log('\n🧹 Cleaning up broken thumbnail references...');
    for (const product of brokenThumbnails) {
      await prisma.product.update({
        where: { id: product.id },
        data: { thumbnailUrl: null }
      });
      console.log(`✅ Cleaned thumbnail for: ${product.name}`);
    }
  }

  if (brokenGalleryImages.length > 0) {
    console.log('\n🧹 Cleaning up broken gallery image references...');
    for (const image of brokenGalleryImages) {
      await prisma.productImage.delete({
        where: { id: image.id }
      });
      console.log(`✅ Deleted broken gallery image for: ${image.product.name}`);
    }
  }

  console.log('\n✨ Cleanup completed!');
}

cleanupBrokenImages()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
