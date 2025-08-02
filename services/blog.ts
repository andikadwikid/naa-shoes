import { BlogPost, BlogCategory } from '../types/blog'

// Mock blog data
const blogData: BlogPost[] = [
  {
    id: 1,
    title: "Tren Sepatu Wanita 2024: Gaya yang Tak Lekang Oleh Waktu",
    slug: "tren-sepatu-wanita-2024",
    excerpt: "Temukan tren sepatu wanita terbaru di tahun 2024 yang menggabungkan kenyamanan dan gaya.",
    content: `
      <p>Tahun 2024 membawa angin segar dalam dunia fashion sepatu wanita. Kombinasi antara kenyamanan dan gaya menjadi prioritas utama para desainer sepatu ternama.</p>
      
      <h2>1. Platform Shoes Kembali Populer</h2>
      <p>Platform shoes dengan tinggi sedang menjadi pilihan favorit karena memberikan tinggi ekstra tanpa mengorbankan kenyamanan. Gaya ini cocok untuk berbagai kesempatan, dari kasual hingga semi-formal.</p>
      
      <h2>2. Sneakers Chunky dengan Sentuhan Feminin</h2>
      <p>Sneakers chunky tidak lagi identik dengan gaya maskulin. Di tahun 2024, sneakers ini hadir dengan detail feminin seperti warna pastel, aksen metallic, dan material yang lebih halus.</p>
      
      <h2>3. Mary Jane dengan Twist Modern</h2>
      <p>Sepatu Mary Jane klasik mendapat sentuhan modern dengan heel yang lebih tinggi dan strap yang lebih beragam. Gaya ini sempurna untuk tampilan retro-chic.</p>
      
      <h2>4. Boots Ankle dengan Detail Unik</h2>
      <p>Ankle boots tetap menjadi favorit dengan berbagai detail unik seperti buckle, zipper samping, atau tekstur kulit yang menarik.</p>
      
      <p>Investasi dalam sepatu berkualitas adalah keputusan bijak. Pilih sepatu yang tidak hanya mengikuti tren, tetapi juga nyaman dan sesuai dengan gaya personal Anda.</p>
    `,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=400&fit=crop",
    author: {
      name: "Sarah Fashion",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-15",
    readTime: 5,
    category: "Fashion Trends",
    tags: ["trends", "2024", "platform", "sneakers", "boots"],
    featured: true
  },
  {
    id: 2,
    title: "Cara Merawat Sepatu Kulit Agar Tahan Lama",
    slug: "cara-merawat-sepatu-kulit",
    excerpt: "Tips dan trik merawat sepatu kulit kesayangan agar tetap awet dan terlihat seperti baru.",
    content: `
      <p>Sepatu kulit adalah investasi jangka panjang yang membutuhkan perawatan khusus agar tetap terlihat elegan dan tahan lama.</p>
      
      <h2>Langkah-langkah Perawatan Rutin</h2>
      
      <h3>1. Pembersihan Setelah Pemakaian</h3>
      <p>Setelah digunakan, bersihkan debu dan kotoran dengan kain lembut atau sikat khusus sepatu. Hindari penggunaan air berlebihan.</p>
      
      <h3>2. Penggunaan Shoe Tree</h3>
      <p>Gunakan shoe tree atau isi sepatu dengan kertas untuk mempertahankan bentuk sepatu dan menyerap kelembaban.</p>
      
      <h3>3. Kondisioning Rutin</h3>
      <p>Aplikasikan leather conditioner setiap 2-3 bulan untuk menjaga kelembutan dan mencegah kulit pecah-pecah.</p>
      
      <h3>4. Penyimpanan yang Tepat</h3>
      <p>Simpan sepatu di tempat yang sejuk dan kering, hindari sinar matahari langsung dan tempat yang lembab.</p>
      
      <h2>Produk Perawatan yang Direkomendasikan</h2>
      <ul>
        <li>Leather cleaner untuk pembersihan mendalam</li>
        <li>Leather conditioner untuk nutrisi kulit</li>
        <li>Shoe cream untuk warna dan kilau</li>
        <li>Water repellent spray untuk perlindungan</li>
      </ul>
      
      <p>Dengan perawatan yang tepat, sepatu kulit Anda bisa bertahan hingga bertahun-tahun dan tetap terlihat menawan.</p>
    `,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=400&fit=crop",
    author: {
      name: "Maya Care Expert",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-10",
    readTime: 7,
    category: "Care Tips",
    tags: ["care", "leather", "maintenance", "tips"]
  },
  {
    id: 3,
    title: "Panduan Memilih Ukuran Sepatu yang Tepat",
    slug: "panduan-memilih-ukuran-sepatu",
    excerpt: "Kunci kenyamanan kaki dimulai dari pemilihan ukuran sepatu yang tepat. Pelajari tips memilih ukuran yang pas.",
    content: `
      <p>Memilih ukuran sepatu yang tepat adalah kunci utama kenyamanan kaki. Ukuran yang salah dapat menyebabkan berbagai masalah kesehatan kaki.</p>
      
      <h2>Mengapa Ukuran Sepatu Penting?</h2>
      <p>Sepatu yang terlalu kecil dapat menyebabkan lecet, kapalan, dan deformasi kaki. Sementara sepatu yang terlalu besar dapat menyebabkan kaki tidak stabil dan mudah terpeleset.</p>
      
      <h2>Cara Mengukur Kaki dengan Benar</h2>
      
      <h3>1. Waktu Pengukuran</h3>
      <p>Ukur kaki di sore atau malam hari ketika kaki dalam kondisi sedikit membengkak, ini akan memberikan ukuran yang lebih akurat.</p>
      
      <h3>2. Teknik Pengukuran</h3>
      <p>Berdiri tegak dan ukur dari ujung jari kaki terpanjang hingga tumit. Ukur kedua kaki karena biasanya ada perbedaan ukuran.</p>
      
      <h3>3. Pertimbangkan Lebar Kaki</h3>
      <p>Selain panjang, lebar kaki juga penting. Kaki yang lebar membutuhkan sepatu dengan width yang sesuai.</p>
      
      <h2>Tips Mencoba Sepatu</h2>
      <ul>
        <li>Coba sepatu dengan kaus kaki yang biasa dipakai</li>
        <li>Pastikan ada ruang sekitar 1-1.5 cm di ujung jari kaki</li>
        <li>Jalan beberapa langkah untuk merasakan kenyamanan</li>
        <li>Perhatikan apakah ada bagian yang terasa sesak atau longgar</li>
      </ul>
      
      <h2>Panduan Konversi Ukuran</h2>
      <p>Setiap brand memiliki standar ukuran yang sedikit berbeda. Selalu rujuk ke size chart dari brand yang bersangkutan.</p>
      
      <p>Ingat, kenyamanan adalah prioritas utama. Jangan memaksakan kaki pada sepatu yang tidak sesuai ukuran.</p>
    `,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=400&fit=crop",
    author: {
      name: "Dr. Fitri Podiatrist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-05",
    readTime: 6,
    category: "Health & Fit",
    tags: ["size", "fit", "health", "comfort", "guide"]
  },
  {
    id: 4,
    title: "Mix and Match: Sepatu untuk Setiap Outfit",
    slug: "mix-match-sepatu-outfit",
    excerpt: "Pelajari cara mencocokkan sepatu dengan berbagai jenis outfit untuk tampilan yang sempurna di setiap kesempatan.",
    content: `
      <p>Sepatu yang tepat dapat mengubah seluruh penampilan Anda. Pelajari cara mencocokkan sepatu dengan outfit untuk berbagai kesempatan.</p>
      
      <h2>Outfit Kasual Sehari-hari</h2>
      
      <h3>Dengan Jeans</h3>
      <p>Sneakers putih atau canvas shoes adalah pilihan yang tidak pernah salah. Untuk tampilan yang lebih chic, coba ankle boots atau loafers.</p>
      
      <h3>Dengan Dress Kasual</h3>
      <p>Flat shoes atau sandal strappy cocok untuk dress kasual. Untuk sedikit tinggi, pilih wedges atau block heels.</p>
      
      <h2>Outfit Formal dan Kerja</h2>
      
      <h3>Dengan Suit atau Blazer</h3>
      <p>Pointed toe pumps atau oxford shoes memberikan kesan profesional. Pilih warna netral seperti hitam, nude, atau navy.</p>
      
      <h3>Dengan Pencil Skirt</h3>
      <p>High heels klasik atau pointed toe flats melengkapi pencil skirt dengan sempurna.</p>
      
      <h2>Outfit untuk Acara Spesial</h2>
      
      <h3>Evening Dress</h3>
      <p>Stiletto heels atau strappy sandals dengan detail yang menarik seperti glitter atau metallic finish.</p>
      
      <h3>Cocktail Party</h3>
      <p>Block heels dengan ankle strap atau sophisticated pumps untuk kenyamanan dan gaya.</p>
      
      <h2>Tips Color Coordination</h2>
      <ul>
        <li>Sepatu hitam: universal, cocok dengan segala warna</li>
        <li>Sepatu nude: memperpanjang garis kaki</li>
        <li>Sepatu berwarna: buat statement atau match dengan aksesori</li>
        <li>Sepatu metallic: tambahan glamor untuk acara malam</li>
      </ul>
      
      <p>Kunci sukses mix and match adalah memahami occasion dan personal style Anda. Jangan takut bereksperimen!</p>
    `,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&h=400&fit=crop",
    author: {
      name: "Aisha Style Consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-01",
    readTime: 8,
    category: "Styling Tips",
    tags: ["styling", "outfit", "coordination", "fashion", "tips"]
  },
  {
    id: 5,
    title: "Investasi Sepatu: Brand Lokal vs Internasional",
    slug: "investasi-sepatu-brand-lokal-vs-internasional",
    excerpt: "Perbandingan antara brand sepatu lokal dan internasional dari segi kualitas, harga, dan value for money.",
    content: `
      <p>Dalam memilih sepatu, kita sering dihadapkan pada pilihan antara brand lokal dan internasional. Mari kita bahas pro dan kontra keduanya.</p>
      
      <h2>Brand Sepatu Lokal</h2>
      
      <h3>Keunggulan</h3>
      <ul>
        <li><strong>Harga lebih terjangkau</strong> - Tidak ada biaya import dan distribusi internasional</li>
        <li><strong>Memahami selera lokal</strong> - Design yang sesuai dengan preferensi wanita Indonesia</li>
        <li><strong>Support ekonomi lokal</strong> - Membantu pertumbuhan industri fashion Indonesia</li>
        <li><strong>Lebih mudah diakses</strong> - Tersedia di berbagai toko dan marketplace lokal</li>
      </ul>
      
      <h3>Tantangan</h3>
      <ul>
        <li>Variasi model masih terbatas</li>
        <li>Beberapa masih dalam tahap pengembangan kualitas</li>
        <li>Brand awareness yang masih berkembang</li>
      </ul>
      
      <h2>Brand Sepatu Internasional</h2>
      
      <h3>Keunggulan</h3>
      <ul>
        <li><strong>Reputasi dan heritage</strong> - Brand dengan sejarah panjang di industri fashion</li>
        <li><strong>Research & Development</strong> - Teknologi dan inovasi yang lebih advanced</li>
        <li><strong>Variasi model</strong> - Pilihan yang lebih beragam dan mengikuti trend global</li>
        <li><strong>Status symbol</strong> - Prestise dan recognition</li>
      </ul>
      
      <h3>Kekurangan</h3>
      <ul>
        <li>Harga yang lebih tinggi</li>
        <li>Tidak selalu sesuai dengan bentuk kaki Asia</li>
        <li>Ketersediaan terbatas</li>
      </ul>
      
      <h2>Tips Memilih</h2>
      
      <h3>Pertimbangkan Budget</h3>
      <p>Tentukan budget yang realistis. Brand lokal menawarkan value yang baik dengan harga terjangkau.</p>
      
      <h3>Sesuaikan dengan Kebutuhan</h3>
      <p>Untuk penggunaan sehari-hari, brand lokal bisa menjadi pilihan tepat. Untuk investasi jangka panjang atau acara khusus, pertimbangkan brand internasional.</p>
      
      <h3>Cek Kualitas Material</h3>
      <p>Regardless of brand, selalu periksa kualitas material, jahitan, dan finishing.</p>
      
      <h2>Kesimpulan</h2>
      <p>Tidak ada jawaban yang mutlak. Yang terpenting adalah sepatu tersebut nyaman, sesuai budget, dan memenuhi kebutuhan Anda. Support brand lokal sambil tetap terbuka pada pilihan internasional.</p>
    `,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop",
    author: {
      name: "Rini Fashion Analyst",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2023-12-28",
    readTime: 6,
    category: "Shopping Guide",
    tags: ["brand", "investment", "local", "international", "value"]
  },
  {
    id: 6,
    title: "Sepatu Ramah Lingkungan: Trend Sustainable Fashion",
    slug: "sepatu-ramah-lingkungan-sustainable-fashion",
    excerpt: "Mengenal trend sepatu ramah lingkungan dan cara memilih footwear yang mendukung sustainability.",
    content: `
      <p>Kesadaran akan lingkungan semakin meningkat di industri fashion, termasuk dalam pembuatan sepatu. Mari pelajari tentang sepatu ramah lingkungan.</p>
      
      <h2>Apa itu Sustainable Shoes?</h2>
      <p>Sepatu sustainable adalah footwear yang diproduksi dengan memperhatikan dampak lingkungan, dari pemilihan material hingga proses produksi.</p>
      
      <h2>Material Ramah Lingkungan</h2>
      
      <h3>1. Kulit Vegan</h3>
      <p>Alternatif kulit dari material nabati seperti kulit jamur, nanas, atau kaktus yang lebih sustainable.</p>
      
      <h3>2. Recycled Materials</h3>
      <p>Penggunaan material daur ulang seperti plastik botol bekas yang diubah menjadi fabric berkualitas.</p>
      
      <h3>3. Organic Cotton</h3>
      <p>Kapas organik yang ditanam tanpa pestisida berbahaya untuk canvas shoes.</p>
      
      <h3>4. Cork dan Bamboo</h3>
      <p>Material alami yang cepat tumbuh dan dapat diperbaharui untuk sole dan accent.</p>
      
      <h2>Brand yang Mengusung Sustainability</h2>
      <ul>
        <li>Adidas dengan koleksi ocean plastic</li>
        <li>Allbirds dengan material wool dan eucalyptus</li>
        <li>Veja dengan fair trade rubber</li>
        <li>Rothy's dengan recycled plastic bottles</li>
      </ul>
      
      <h2>Tips Membeli Sepatu Sustainable</h2>
      
      <h3>1. Research Brand</h3>
      <p>Cari tahu komitmen brand terhadap sustainability dan transparansi supply chain.</p>
      
      <h3>2. Kualitas vs Kuantitas</h3>
      <p>Pilih sepatu berkualitas tinggi yang tahan lama daripada membeli banyak sepatu murah.</p>
      
      <h3>3. Care dan Repair</h3>
      <p>Rawat sepatu dengan baik dan perbaiki jika rusak untuk memperpanjang masa pakai.</p>
      
      <h3>4. Recycle Program</h3>
      <p>Pilih brand yang menyediakan program daur ulang untuk sepatu lama.</p>
      
      <h2>Dampak Positif</h2>
      <p>Dengan memilih sepatu sustainable, kita berkontribusi mengurangi limbah fashion, mendukung fair trade, dan menjaga lingkungan untuk generasi mendatang.</p>
      
      <p>Setiap pembelian adalah vote untuk jenis dunia yang kita inginkan. Mari pilih fashion yang bertanggung jawab!</p>
    `,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&h=400&fit=crop",
    author: {
      name: "Green Fashion Advocate",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2023-12-25",
    readTime: 7,
    category: "Sustainability",
    tags: ["sustainable", "eco-friendly", "environment", "vegan", "recycled"],
    featured: true
  }
]

export const categories: BlogCategory[] = [
  { name: "All Posts", slug: "all", count: blogData.length },
  { name: "Fashion Trends", slug: "fashion-trends", count: blogData.filter(post => post.category === "Fashion Trends").length },
  { name: "Care Tips", slug: "care-tips", count: blogData.filter(post => post.category === "Care Tips").length },
  { name: "Health & Fit", slug: "health-fit", count: blogData.filter(post => post.category === "Health & Fit").length },
  { name: "Styling Tips", slug: "styling-tips", count: blogData.filter(post => post.category === "Styling Tips").length },
  { name: "Shopping Guide", slug: "shopping-guide", count: blogData.filter(post => post.category === "Shopping Guide").length },
  { name: "Sustainability", slug: "sustainability", count: blogData.filter(post => post.category === "Sustainability").length }
]

// API functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return blogData
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const post = blogData.find(post => post.slug === slug)
  return post || null
}

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return blogData.filter(post => post.featured).slice(0, 3)
}

export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  if (category === 'all') return blogData
  return blogData.filter(post => post.category === category)
}

export const getRecentBlogPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return blogData
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 50))
  return categories
}
