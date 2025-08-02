// Konfigurasi WhatsApp untuk checkout
export const WHATSAPP_CONFIG = {
  // Nomor WhatsApp toko (format: 62xxx tanpa tanda + di depan)
  // Contoh: untuk nomor +62 812-3456-7890, tulis sebagai '6281234567890'
  number: '6281234567890',
  
  // Nama toko untuk ditampilkan di pesan WhatsApp
  storeName: 'NAA Shoes',
  
  // Template pesan yang akan dikirim (opsional, untuk customization lebih lanjut)
  messageTemplate: {
    greeting: 'Halo! Saya tertarik untuk membeli sepatu dari',
    closing: 'Mohon informasi lebih lanjut untuk proses pemesanan. Terima kasih!'
  }
}

// Fungsi helper untuk format nomor WhatsApp
export const formatWhatsAppNumber = (number: string): string => {
  // Hapus karakter non-digit
  const cleanNumber = number.replace(/\D/g, '')
  
  // Pastikan dimulai dengan 62
  if (cleanNumber.startsWith('0')) {
    return '62' + cleanNumber.slice(1)
  } else if (!cleanNumber.startsWith('62')) {
    return '62' + cleanNumber
  }
  
  return cleanNumber
}
