export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  colors: string[]
  sizes: number[]
  isNew?: boolean
  isOnSale?: boolean
}

export const categories = [
  'All',
  'Sneakers',
  'High Heels',
  'Flats',
  'Boots',
  'Sandals'
]

export const products: Product[] = [
  {
    id: 1,
    name: "Elegant Rose Gold Heels",
    price: 850000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "Sepatu hak tinggi dengan warna rose gold yang elegan, perfect untuk acara formal dan pesta.",
    colors: ["Rose Gold", "Silver", "Black"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  },
  {
    id: 2,
    name: "Comfortable White Sneakers",
    price: 650000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers putih yang nyaman untuk aktivitas sehari-hari dengan design modern dan trendy.",
    colors: ["White", "Cream", "Light Pink"],
    sizes: [36, 37, 38, 39, 40, 41],
    isNew: true
  },
  {
    id: 3,
    name: "Classic Black Boots",
    price: 950000,
    image: "https://images.unsplash.com/photo-1608256246200-53e8b47b859f?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Boot hitam klasik yang cocok untuk cuaca dingin dan memberikan kesan edgy.",
    colors: ["Black", "Brown", "Dark Gray"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 4,
    name: "Minimalist Nude Flats",
    price: 450000,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Flat shoes dengan warna nude yang minimalis, cocok untuk outfit apapun.",
    colors: ["Nude", "Beige", "Light Brown"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 5,
    name: "Summer Coral Sandals",
    price: 380000,
    originalPrice: 500000,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Sandal dengan warna coral yang cerah, perfect untuk musim panas dan liburan.",
    colors: ["Coral", "Pink", "Peach"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  },
  {
    id: 6,
    name: "Sporty Pink Sneakers",
    price: 720000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers pink yang sporty dengan teknologi cushioning untuk kenyamanan maksimal.",
    colors: ["Pink", "White", "Gray"],
    sizes: [36, 37, 38, 39, 40, 41],
    isNew: true
  },
  {
    id: 7,
    name: "Luxury Patent Heels",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "High heels mewah dengan material patent leather yang berkilau dan elegan.",
    colors: ["Black", "Red", "Navy"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 8,
    name: "Bohemian Style Sandals",
    price: 420000,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Sandal dengan style bohemian yang unik, cocok untuk tampilan kasual yang chic.",
    colors: ["Brown", "Tan", "Natural"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 9,
    name: "Office Ready Flats",
    price: 580000,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Flat shoes yang profesional dan nyaman untuk digunakan di kantor sepanjang hari.",
    colors: ["Black", "Navy", "Gray"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 10,
    name: "Trendy Ankle Boots",
    price: 890000,
    originalPrice: 1100000,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Ankle boots trendy dengan detail yang menarik untuk tampilan fashionable.",
    colors: ["Black", "Tan", "Wine"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  }
]

export const featuredProducts = products.filter(product => product.isNew || product.isOnSale).slice(0, 6)
