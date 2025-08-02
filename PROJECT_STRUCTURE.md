# 📁 Struktur Folder NAA Shoes

Struktur folder ini dirancang untuk memudahkan maintenance dan development dengan prinsip separation of concerns.

## 📂 Struktur Utama

```
├── app/                    # App Router Next.js (halaman)
│   ├── (pages)/           # Route groups
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
│
├── components/            # UI Components (reusable)
│   ├── Navigation.tsx     # Header navigation
│   ├── ProductCard.tsx    # Product card component
│   └── Toast.tsx          # Toast notifications
│
├── hooks/                 # Custom hooks & state management
│   ├── useCart.tsx        # Cart context & hook
│   └── useToast.tsx       # Toast context & hook
│
├── lib/                   # Helper functions & utilities
│   ├── utils.ts           # General utilities
│   └── whatsapp.ts        # WhatsApp link generator
│
├── services/              # Data services & API calls
│   └── products.ts        # Product data & mock API
│
├── types/                 # TypeScript interfaces
│   ├── product.ts         # Product & Cart types
│   └── ui.ts              # UI component types
│
└── public/                # Static assets
    └── images/
```

## 🎯 Penjelasan Folder

### **`app/`** - App Router Pages
- Hanya berisi file routing dan layout Next.js
- Setiap folder = route URL
- `layout.tsx` untuk shared layout
- `page.tsx` untuk halaman utama

### **`components/`** - UI Components
- Komponen React yang reusable
- Setiap komponen dalam file terpisah
- Fokus pada UI dan presentation logic
- Props menggunakan TypeScript interfaces

### **`hooks/`** - State Management
- Custom hooks untuk logic yang reusable
- Context providers untuk global state
- Contoh: `useCart`, `useToast`
- Menggantikan folder `context/` lama

### **`lib/`** - Helper Functions
- Utility functions yang pure
- Helper untuk formatting, validation, dll
- Business logic yang tidak terkait UI
- Contoh: WhatsApp link generator

### **`services/`** - Data Layer
- Mock APIs dan data fetching
- Interface ke external services
- Data transformation logic
- Future: real API calls

### **`types/`** - TypeScript Definitions
- Interface dan type definitions
- Shared types across components
- Helps dengan type safety
- Organized by domain (product, ui, etc)

## 🔄 Migration dari Struktur Lama

### Sebelum:
```
app/
├── components/
├── context/
├── data/
└── config/
```

### Sesudah:
```
app/           # Pages only
components/    # Moved from app/components/
hooks/         # Moved from app/context/
services/      # Moved from app/data/
lib/           # Moved from app/config/ + utilities
types/         # New - extracted interfaces
```

## 🚀 Keuntungan Struktur Baru

1. **Better Separation of Concerns**
   - UI, logic, data, dan types terpisah jelas
   - Easier untuk testing dan maintenance

2. **Improved Developer Experience**
   - Imports yang lebih predictable
   - Auto-completion TypeScript yang lebih baik

3. **Scalability**
   - Mudah menambah components baru
   - Structure yang familiar untuk developer lain

4. **Type Safety**
   - Centralized type definitions
   - Reduced type errors dan bugs

5. **Reusability**
   - Components bisa digunakan di multiple pages
   - Hooks bisa di-share across components

## 📝 Best Practices

### Import Conventions:
```typescript
// External libraries first
import React from 'react'
import { NextPage } from 'next'

// Internal imports by category
import { Product } from '../types/product'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../lib/utils'
import ProductCard from '../components/ProductCard'
```

### File Naming:
- **PascalCase**: Components (`ProductCard.tsx`)
- **camelCase**: Hooks (`useCart.tsx`)
- **kebab-case**: Utilities (`lib/utils.ts`)
- **lowercase**: Types (`types/product.ts`)

### Exports:
- Default export untuk main component/function
- Named exports untuk utilities dan types
- Consistent export patterns across files

## 🔧 Development Workflow

1. **Adding New Feature:**
   - Define types in `types/`
   - Create service in `services/`
   - Build components in `components/`
   - Add hooks if needed in `hooks/`
   - Use in pages under `app/`

2. **Refactoring:**
   - Extract logic to `lib/`
   - Move shared state to `hooks/`
   - Abstract reusable UI to `components/`

3. **Testing:**
   - Test utilities in `lib/` (pure functions)
   - Test components in isolation
   - Test hooks with React Testing Library

## 🎨 Example Usage

```typescript
// In a page component
import { useCart } from '../../hooks/useCart'
import { Product } from '../../types/product'
import { formatCurrency } from '../../lib/utils'
import ProductCard from '../../components/ProductCard'
import { getProducts } from '../../services/products'

// Clean, organized, and type-safe!
```

Struktur ini membuat codebase NAA Shoes lebih maintainable, scalable, dan developer-friendly! 🚀
