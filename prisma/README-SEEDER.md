# Database Seeder Documentation

## Overview
This directory contains database seeding scripts for the NAA Shoes application with complete size guide and color stock functionality.

## Files

### Main Seeder Files
- `seed-complete.ts` - Comprehensive seeder with all master data and products
- `seed.ts` - Original simple seeder (legacy)
- `seed-size-guide.ts` - Specific seeder for size guides and color stock (used for updates)
- `verify-data.ts` - Data verification script

## Available NPM Scripts

```bash
# Complete database setup (reset + seed)
npm run db:setup

# Reset database and run all migrations
npm run db:reset

# Run the comprehensive seeder
npm run db:seed

# Verify seeded data
npm run db:verify
```

## Seeded Data Structure

### Master Data
- **Categories**: 5 categories (Sneakers, High Heels, Flats, Boots, Sandals)
- **Brands**: 8 brands (Nike, Adidas, Zara, Charles & Keith, etc.)
- **Colors**: 8 colors with hex codes
- **Sizes**: 7 sizes (36-42)

### Products
- **8 Sample Products** with realistic data:
  - Nike Air Max 90 Pink
  - Elegant Rose Gold Heels
  - Comfort Black Flats
  - Adventure Leather Boots
  - Summer Gold Sandals
  - Adidas Ultraboost White
  - Converse Chuck Taylor Pink
  - H&M Nude Office Heels

### Enhanced Features
- **Color Stock**: Each product color has individual stock levels
- **Size Guides**: Each product size has corresponding foot length in centimeters
- **Size Stock**: Each product size has individual stock levels
- **Blog Content**: Sample blog posts and categories
- **Sample Customers**: 2 sample customers for testing

## Size Guide Formula
The seeder uses the standard EU shoe size to foot length conversion:
```
Foot Length (cm) = (EU Size - 2) ÷ 1.5
```

Examples:
- Size 36: 22.7 cm
- Size 38: 24.0 cm
- Size 40: 25.3 cm

## Stock Generation
- **Color Stock**: Random values between 10-60 units per color
- **Size Stock**: Random values between 5-35 units per size
- **Realistic Distribution**: Different products have different stock patterns

## Usage Examples

### Full Database Reset and Setup
```bash
npm run db:setup
```

### Just Run Seeder (without reset)
```bash
npm run db:seed
```

### Verify Data After Seeding
```bash
npm run db:verify
```

### Manual Commands
```bash
# Reset only
npx prisma migrate reset --force

# Seed only
npx tsx prisma/seed-complete.ts

# Verify only
npx tsx prisma/verify-data.ts
```

## Data Verification Output
The verification script shows:
- Total counts for all entities
- Sample product details with stock information
- Color stock breakdown for sample products
- Size guide details for sample products

## Customization
To modify the seeded data:
1. Edit `seed-complete.ts`
2. Modify the `productsData` array
3. Adjust stock ranges in the random generation functions
4. Run `npm run db:setup` to apply changes

## Notes
- All seeded products have both color stock and size guides configured
- Stock levels are randomized but within realistic ranges
- Size guides use the standard EU sizing formula
- Blog content is included for testing the complete application
- Sample customers are provided for order testing
