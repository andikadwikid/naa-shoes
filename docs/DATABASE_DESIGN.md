# NAA Shoes E-commerce Database Design Documentation

## Overview
This document provides comprehensive documentation for the NAA Shoes e-commerce application database design, built using PostgreSQL with Prisma ORM. The database is designed to handle a complete shoe retail business with inventory management, order processing, customer management, and content management capabilities.

## Database Architecture Hierarchy

```
NAA Shoes E-commerce Database
├── 🏪 Master Data Layer
│   ├── Categories (sepatu wanita, pria, anak, dll)
│   ├── Brands (nike, adidas, converse, dll)
│   ├── Colors (merah, biru, hitam, dll)
│   ├── Sizes (36, 37, 38, 39, dll)
│   └── Size Templates (template ukuran standar)
│
├── 🛍️ Product Management Layer
│   ├── Products (data produk utama)
│   ├── Product Images (galeri foto produk)
│   ├── Product Inventory (stok per warna-ukuran)
│   └── Size Guides (panduan ukuran per produk)
│
├── 👥 Customer & Order Layer
│   ├── Customers (data pelanggan)
│   ├── Orders (pesanan)
│   ├── Order Items (detail item pesanan)
│   └── Reviews (ulasan produk)
│
└── 📝 Content Management Layer
    ├── Authors (penulis blog)
    ├── Blog Categories (kategori artikel)
    ├── Blog Posts (artikel blog)
    ├── Tags (tag artikel)
    └── Blog Tags (relasi artikel-tag)
```

## Key Design Innovations

### 1. ProductInventory Model
**Problem Solved**: Sebelumnya, stok disimpan terpisah di ProductColor dan ProductSize, menyebabkan data tidak konsisten.

**Solution**: Model ProductInventory yang menggabungkan product, color, size, dan stock dalam satu tabel dengan unique constraint.

```sql
-- Unique constraint memastikan tidak ada duplikasi kombinasi produk-warna-ukuran
@@unique([productId, colorId, sizeId])
```

### 2. Size Template System
**Problem Solved**: Admin harus input ukuran satu per satu untuk setiap produk.

**Solution**: Template ukuran standar yang bisa digunakan ulang untuk berbagai produk.

## Detailed Schema Documentation

### 🏪 Master Data Models

#### Categories
```prisma
model Category {
  id          Int      @id @default(autoincrement())
  name        String   @unique                      // Nama kategori (e.g., "Sepatu Wanita")
  slug        String   @unique                      // URL-friendly version
  description String?                               // Deskripsi kategori
  isActive    Boolean  @default(true)              // Status aktif/nonaktif
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  products Product[]                                // Relasi ke produk
}
```

**Purpose**: Mengkategorikan produk berdasarkan jenis (sepatu wanita, pria, anak, dll)

#### Brands
```prisma
model Brand {
  id          Int      @id @default(autoincrement())
  name        String   @unique                      // Nama brand (e.g., "Nike")
  slug        String   @unique                      // URL slug
  description String?                               // Deskripsi brand
  logo        String?                               // URL logo brand
  website     String?                               // Website brand
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  products Product[]                                // Produk dari brand ini
}
```

**Purpose**: Mengelola data brand/merek sepatu

#### Colors
```prisma
model Color {
  id        Int      @id @default(autoincrement())
  name      String   @unique                        // Nama warna (e.g., "Merah")
  hexCode   String?                                 // Kode hex untuk display (#FF0000)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  productInventories ProductInventory[]             // Inventory yang menggunakan warna ini
}
```

**Purpose**: Master data warna yang tersedia untuk produk

#### Sizes
```prisma
model Size {
  id        Int      @id @default(autoincrement())
  value     Int      @unique                        // Nomor ukuran (36, 37, 38, dll)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  productInventories ProductInventory[]             // Inventory dengan ukuran ini
  sizeGuides         SizeGuide[]                   // Panduan ukuran
  sizeTemplateItems  SizeTemplateItem[]            // Item dalam template ukuran
}
```

**Purpose**: Master data ukuran sepatu (standar Indonesia/Eropa)

#### Size Templates & Items
```prisma
model SizeTemplate {
  id          Int      @id @default(autoincrement())
  name        String   @unique                      // Nama template (e.g., "Standar Wanita")
  description String?                               // Deskripsi template
  category    String?                               // Kategori (heels, sneakers, dll)
  isActive    Boolean  @default(true)
  isDefault   Boolean  @default(false)              // Template default
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  sizeTemplateItems SizeTemplateItem[]             // Item-item dalam template
}

model SizeTemplateItem {
  id          Int   @id @default(autoincrement())
  centimeters Float                                 // Panjang kaki dalam cm
  
  sizeTemplateId Int
  sizeTemplate   SizeTemplate @relation(fields: [sizeTemplateId], references: [id], onDelete: Cascade)
  
  sizeId Int
  size   Size @relation(fields: [sizeId], references: [id])
  
  @@unique([sizeTemplateId, sizeId])              // Tidak boleh duplikat ukuran dalam template
}
```

**Purpose**: Template ukuran standar untuk mempercepat input data produk

### 🛍️ Product Management Models

#### Products
```prisma
model Product {
  id            Int      @id @default(autoincrement())
  name          String                             // Nama produk
  slug          String   @unique                   // URL slug
  description   String?                           // Deskripsi produk
  price         Float                             // Harga jual
  originalPrice Float?                           // Harga asli (untuk diskon)
  thumbnailUrl  String?                          // URL thumbnail utama
  isNew         Boolean  @default(false)         // Produk baru
  isOnSale      Boolean  @default(false)         // Sedang diskon
  isActive      Boolean  @default(true)          // Status aktif
  weight        Float?                           // Berat (gram)
  dimensions    String?                          // Dimensi (JSON string)
  material      String?                          // Bahan
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Foreign Keys
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])
  
  brandId Int?
  brand   Brand? @relation(fields: [brandId], references: [id])
  
  // Relations
  galleryImages      ProductImage[]               // Galeri foto
  productInventories ProductInventory[]           // Inventory (warna-ukuran-stok)
  sizeGuides         SizeGuide[]                 // Panduan ukuran
  reviews            Review[]                    // Ulasan
  orderItems         OrderItem[]                 // Item pesanan
}
```

**Purpose**: Data utama produk sepatu

#### Product Images
```prisma
model ProductImage {
  id           Int      @id @default(autoincrement())
  url          String                             // URL gambar
  altText      String?                           // Alt text untuk SEO
  caption      String?                           // Caption gambar
  displayOrder Int      @default(0)              // Urutan tampil
  createdAt    DateTime @default(now())
  
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

**Purpose**: Galeri foto produk dengan urutan tampil

#### Product Inventory (KEY INNOVATION)
```prisma
model ProductInventory {
  id    Int @id @default(autoincrement())
  stock Int @default(0)                          // Stok untuk kombinasi ini
  
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  colorId Int
  color   Color @relation(fields: [colorId], references: [id])
  
  sizeId Int
  size   Size @relation(fields: [sizeId], references: [id])
  
  @@unique([productId, colorId, sizeId])         // KUNCI: Tidak boleh duplikat kombinasi
}
```

**Purpose**: 
- Mengatasi masalah data stock yang tidak konsisten
- Setiap kombinasi produk-warna-ukuran memiliki stok terpisah
- Unique constraint mencegah duplikasi data

**Example Data**:
```
ProductInventory Records:
├── Nike Air Max (Merah, Size 36) → Stock: 5
├���─ Nike Air Max (Merah, Size 37) → Stock: 3
├── Nike Air Max (Biru, Size 36) → Stock: 8
└── Nike Air Max (Biru, Size 37) → Stock: 2
```

#### Size Guides
```prisma
model SizeGuide {
  id          Int   @id @default(autoincrement())
  centimeters Float                              // Ukuran dalam cm
  
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  sizeId Int
  size   Size @relation(fields: [sizeId], references: [id])
  
  @@unique([productId, sizeId])                 // Satu produk, satu ukuran, satu panduan
}
```

**Purpose**: Panduan ukuran spesifik per produk (dalam centimeter)

### 👥 Customer & Order Models

#### Customers
```prisma
model Customer {
  id        Int      @id @default(autoincrement())
  email     String   @unique                     // Email unik
  name      String                              // Nama pelanggan
  phone     String?                             // Nomor telepon
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  orders  Order[]                               // Pesanan pelanggan
  reviews Review[]                              // Ulasan dari pelanggan
}
```

#### Orders & Order Items
```prisma
model Order {
  id              Int         @id @default(autoincrement())
  orderNumber     String      @unique            // Nomor pesanan unik
  status          OrderStatus @default(PENDING)  // Status pesanan
  totalAmount     Float                          // Total pembayaran
  shippingCost    Float       @default(0)       // Biaya kirim
  notes           String?                        // Catatan pesanan
  shippingAddress String?                        // Alamat kirim
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  customerId Int
  customer   Customer @relation(fields: [customerId], references: [id])
  
  orderItems OrderItem[]                        // Detail item pesanan
}

model OrderItem {
  id       Int    @id @default(autoincrement())
  quantity Int                                  // Jumlah item
  price    Float                               // Harga saat pesan
  size     Int                                 // Ukuran yang dipesan
  color    String                              // Warna yang dipesan
  
  orderId Int
  order   Order @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId Int
  product   Product @relation(fields: [productId], references: [id])
}

enum OrderStatus {
  PENDING     // Menunggu konfirmasi
  CONFIRMED   // Dikonfirmasi
  PROCESSING  // Sedang diproses
  SHIPPED     // Dikirim
  DELIVERED   // Diterima
  CANCELLED   // Dibatalkan
}
```

#### Reviews
```prisma
model Review {
  id         Int      @id @default(autoincrement())
  rating     Int                                // Rating 1-5 bintang
  comment    String?                           // Komentar ulasan
  isApproved Boolean  @default(false)          // Perlu approval admin
  createdAt  DateTime @default(now())
  
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  customerId Int
  customer   Customer @relation(fields: [customerId], references: [id])
}
```

### 📝 Content Management Models

#### Blog System
```prisma
model Author {
  id        Int      @id @default(autoincrement())
  name      String                              // Nama penulis
  email     String   @unique                    // Email penulis
  avatar    String?                             // URL avatar
  bio       String?                             // Biografi
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  blogPosts BlogPost[]                          // Artikel yang ditulis
}

model BlogCategory {
  id          Int      @id @default(autoincrement())
  name        String   @unique                  // Nama kategori blog
  slug        String   @unique                  // URL slug
  description String?                           // Deskripsi kategori
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  blogPosts BlogPost[]                          // Artikel dalam kategori
}

model BlogPost {
  id           Int       @id @default(autoincrement())
  title        String                           // Judul artikel
  slug         String    @unique                // URL slug
  excerpt      String?                          // Ringkasan artikel
  content      String    @db.Text              // Konten lengkap
  image        String?                          // Gambar featured
  isPublished  Boolean   @default(false)       // Status publish
  isFeatured   Boolean   @default(false)       // Artikel unggulan
  readTime     Int?                             // Estimasi waktu baca (menit)
  publishedAt  DateTime?                        // Tanggal publish
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  authorId         Int
  author           Author        @relation(fields: [authorId], references: [id])
  blogCategoryId   Int
  blogCategory     BlogCategory  @relation(fields: [blogCategoryId], references: [id])
  tags             BlogTag[]                    // Tag artikel (many-to-many)
}
```

## Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Category  │◄────────┤   Product   ├────────►│    Brand    │
└─────────────┘  1:N    └──────┬──────┘  N:1    └─────────────┘
                                │ 1:N
                                ▼
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Color    │◄────────┤ ProductInv  ├────────►│    Size     │
└─────────────┘  1:N    └─────────────┘  N:1    └─────────────┘
                         (Key Innovation)

┌─────────────┐  1:N    ┌─────────────┐  N:1    ┌─────────────┐
│ SizeTemplate├────────►│SizeTemplItem├────────►│    Size     │
└─────────────┘         └─────────────┘         └─────────────┘

┌─────────────┐  1:N    ┌─────────────┐  N:1    ┌─────────────┐
│  Customer   ├────────►│    Order    ├────────►│  OrderItem  │
└─────────────┘         └─────────────┘         └─────────────┘
                                                        │ N:1
                                                        ▼
                                                ┌─────────────┐
                                                │   Product   │
                                                └─────────────┘
```

## Key Design Decisions & Benefits

### 1. Normalized ProductInventory
**Before**: 
```
ProductColor { stock: 10 }  // Stock untuk semua ukuran warna ini?
ProductSize { stock: 15 }   // Stock untuk semua warna ukuran ini?
```

**After**:
```
ProductInventory {
  product: "Nike Air Max",
  color: "Merah", 
  size: 36,
  stock: 5  // Stock spesifik untuk kombinasi ini
}
```

**Benefits**:
- ✅ Data konsisten dan akurat
- ✅ Tidak ada ambiguitas stock
- ✅ Mudah query stock spesifik
- ✅ Mendukung inventory yang kompleks

### 2. Size Template System
**Benefits**:
- ✅ Input produk lebih cepat
- ✅ Konsistensi ukuran antar produk
- ✅ Fleksibilitas untuk berbagai jenis sepatu
- ✅ Mudah maintenance ukuran standar

### 3. Flexible Blog System
**Benefits**:
- ✅ SEO-friendly dengan slug
- ✅ Support multiple authors
- ✅ Categorization dan tagging
- ✅ Draft/publish workflow
- ✅ Featured content system

### 4. Comprehensive Order Management
**Benefits**:
- ✅ Complete order lifecycle tracking
- ✅ Detailed order items dengan snapshot harga
- ✅ Customer relationship management
- ✅ Review system terintegrasi

## Usage Examples

### Query Stock for Specific Product Variant
```typescript
// Cek stock Nike Air Max warna merah ukuran 36
const inventory = await prisma.productInventory.findUnique({
  where: {
    productId_colorId_sizeId: {
      productId: 1,
      colorId: 2,  // Merah
      sizeId: 10   // Size 36
    }
  }
});
console.log(`Stock tersedia: ${inventory?.stock || 0}`);
```

### Get Product with All Variants
```typescript
const product = await prisma.product.findFirst({
  include: {
    category: true,
    brand: true,
    galleryImages: true,
    productInventories: {
      include: {
        color: true,
        size: true
      }
    }
  }
});

// Extract available colors and sizes
const availableColors = [...new Set(product.productInventories.map(inv => inv.color.name))];
const availableSizes = [...new Set(product.productInventories.map(inv => inv.size.value))];
```

### Create Order with Multiple Items
```typescript
const order = await prisma.order.create({
  data: {
    orderNumber: "ORD-001",
    customerId: 1,
    totalAmount: 1500000,
    status: "PENDING",
    orderItems: {
      create: [
        {
          productId: 1,
          quantity: 1,
          price: 750000,
          size: 36,
          color: "Merah"
        },
        {
          productId: 2,
          quantity: 1,
          price: 750000,
          size: 37,
          color: "Biru"
        }
      ]
    }
  }
});
```

## Migration Strategy

When implementing this database:

1. **Start with Master Data**: Category, Brand, Color, Size, SizeTemplate
2. **Create Products**: Basic product information
3. **Setup ProductInventory**: Migrate existing stock data to new structure
4. **Add Images & Guides**: Product images and size guides
5. **Setup Order System**: Customer, Order, OrderItem models
6. **Add Content System**: Blog-related models

## Performance Considerations

### Indexes Recommended
```sql
-- For frequent queries
CREATE INDEX idx_product_inventory_lookup ON product_inventories(productId, colorId, sizeId);
CREATE INDEX idx_product_active ON products(isActive);
CREATE INDEX idx_order_customer ON orders(customerId);
CREATE INDEX idx_blog_published ON blog_posts(isPublished, publishedAt);
```

### Query Optimization
- Use `include` judiciously to avoid N+1 queries
- Implement pagination for product listings
- Cache frequent master data queries
- Use database views for complex reporting queries

---

*Documentation generated for NAA Shoes E-commerce Database Design*
*Last updated: December 2024*
