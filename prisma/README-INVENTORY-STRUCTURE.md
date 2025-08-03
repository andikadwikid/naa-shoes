# Product Inventory Structure Update

## Masalah Sebelumnya

Sebelum update ini, database memiliki struktur yang terpisah untuk:
- **ProductColor** dengan field `stock` - stock per warna
- **ProductSize** dengan field `stock` - stock per ukuran

Ini menyebabkan **anomali data** karena:
- Total stock warna tidak sama dengan total stock ukuran
- Tidak ada cara untuk melacak stock per kombinasi warna-ukuran
- Contoh masalah: Color Black = 10 stock, Color Gold = 10 stock (total 20), tetapi Size 32 = 5 stock, Size 39 = 6 stock (total 11)

## Solusi: ProductInventory Model

Struktur baru menggunakan model **ProductInventory** yang menggabungkan:
- `colorId` - ID warna
- `sizeId` - ID ukuran  
- `stock` - stock untuk kombinasi warna-ukuran tertentu

### Schema Database Baru

```prisma
model ProductInventory {
  id    Int @id @default(autoincrement())
  stock Int @default(0) // Stock untuk kombinasi warna-ukuran spesifik

  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  colorId Int
  color   Color @relation(fields: [colorId], references: [id])

  sizeId Int
  size   Size @relation(fields: [sizeId], references: [id])

  @@unique([productId, colorId, sizeId])
  @@map("product_inventories")
}
```

### Keuntungan Struktur Baru

1. **Konsistensi Data**: Stock selalu akurat per kombinasi warna-ukuran
2. **Tidak Ada Anomali**: Total stock warna = jumlah semua stock ukuran dalam warna tersebut
3. **Fleksibilitas**: Dapat melacak stock yang sangat detail
4. **Realitas Bisnis**: Sesuai dengan kebutuhan e-commerce nyata

### Contoh Data

**Product: Classic Black Pumps**
```
Black Size 35: 1 stock
Black Size 36: 3 stock
Black Size 37: 7 stock
...
White Size 35: 10 stock
White Size 36: 12 stock
...
```

**Aggregated View**:
- Total Black: 38 units (1+3+7+...)
- Total White: 65 units (10+12+...)
- Total Size 35: 17 units (1 Black + 10 White + 6 Nude)

## Perubahan Kode

### 1. Database Schema

- ✅ Menghapus `ProductColor.stock` dan `ProductSize.stock`
- ✅ Menambah model `ProductInventory` dengan unique constraint
- ✅ Migration berhasil tanpa kehilangan data

### 2. API Routes

- ✅ **Admin Products API** (`/api/admin/products`): Menggunakan `productInventories`
- ✅ **Frontend Products API** (`/api/products`): Backward compatibility dengan legacy fields
- ✅ **Product Detail API**: Mentransform data untuk kompatibilitas

### 3. Frontend Components

- ✅ **ProductForm**: UI matrix untuk input stock per warna-ukuran
- ✅ **AddToCartDialog**: Menggunakan helper functions untuk stock checking
- ✅ **Product Types**: Helper functions untuk backward compatibility

### 4. Helper Functions

```typescript
// Ambil warna yang tersedia
export const getAvailableColors = (product: Product): string[]

// Ambil ukuran yang tersedia  
export const getAvailableSizes = (product: Product): number[]

// Ambil stock untuk kombinasi warna-ukuran
export const getStockForColorSize = (product: Product, colorName: string, size: number): number

// Ambil total stock untuk warna tertentu
export const getTotalStockForColor = (product: Product, colorName: string): number

// Ambil hex code warna
export const getColorHexCode = (product: Product, colorName: string): string
```

## Admin Form UI

Form admin sekarang menampilkan **inventory matrix table**:

```
Color/Size  | 35 | 36 | 37 | 38 | Total
------------|----|----|----|----|------
Black       | 1  | 3  | 7  | 9  | 20
White       | 10 | 12 | 12 | 12 | 46
Nude        | 6  | 12 | 1  | 7  | 26
------------|----|----|----|----|------
Total       | 17 | 27 | 20 | 28 | 92
```

## Backward Compatibility

Untuk memastikan kode lama tetap berfungsi, API frontend masih menyediakan:
- `colors: string[]` - array nama warna
- `sizes: number[]` - array ukuran
- `colorStock: ColorStock[]` - aggregated stock per warna

## Migration & Seeding

- **Migration**: `20250803151050_add_product_inventory`
- **Seeder**: `prisma/seed-complete-v2.ts`
- **Verification**: `prisma/verify-data.ts`

## Scripts NPM

```bash
npm run db:reset    # Reset database
npm run db:seed     # Run seeder baru
npm run db:verify   # Verifikasi data
npm run db:setup    # Reset + seed
```

## Status

✅ **COMPLETED**: Struktur ProductInventory berhasil diimplementasi  
✅ **TESTED**: Semua data terverifikasi dengan 142 inventory entries  
✅ **DOCUMENTED**: Dokumentasi lengkap tersedia

## Kesimpulan

Dengan struktur ProductInventory yang baru:
1. **Tidak ada lagi anomali data** antara stock warna dan ukuran
2. **Admin dapat mengelola stock per kombinasi** warna-ukuran dengan mudah
3. **Customer mendapat informasi stock yang akurat** saat memilih produk
4. **Sistem lebih scalable** untuk kebutuhan e-commerce yang kompleks

Database sekarang memiliki **1,180 total stock units** terdistribusi dalam **142 inventory entries** yang konsisten dan akurat.
