# Konfigurasi WhatsApp Checkout

## Cara Menggunakan

Untuk mengaktifkan fitur checkout via WhatsApp, Anda perlu mengonfigurasi nomor WhatsApp toko di file `whatsapp.ts`.

## Pengaturan Nomor WhatsApp

1. Buka file `app/config/whatsapp.ts`
2. Ubah nilai `number` dengan nomor WhatsApp toko Anda
3. Format nomor: `62xxxxxxxxxxxxx` (dimulai dengan 62, tanpa tanda +)

### Contoh:
```typescript
export const WHATSAPP_CONFIG = {
  number: '6281234567890', // Ganti dengan nomor WhatsApp toko
  storeName: 'NAA Shoes',   // Ganti dengan nama toko
  // ...
}
```

### Format Nomor yang Benar:
- ✅ `6281234567890` (format internasional Indonesia)
- ✅ `6287654321098` 
- ❌ `+6281234567890` (jangan gunakan tanda +)
- ❌ `081234567890` (jangan gunakan format lokal)

## Kustomisasi Pesan

Anda dapat mengkustomisasi template pesan di bagian `messageTemplate`:

```typescript
messageTemplate: {
  greeting: 'Halo! Saya tertarik untuk membeli sepatu dari',
  closing: 'Mohon informasi lebih lanjut untuk proses pemesanan. Terima kasih!'
}
```

## Fitur yang Tersedia

- ✅ Otomatis generate pesan berdasarkan item di cart
- ✅ Format pesan yang rapi dengan emoji
- ✅ Detail produk (nama, size, color, quantity, harga)
- ✅ Total harga dan ringkasan pesanan
- ✅ Link WhatsApp yang langsung bisa diklik
- ✅ Encoding URL yang aman

## Cara Kerja

1. User mengklik tombol "Checkout via WhatsApp"
2. Sistem generate pesan berdasarkan cart items
3. Pesan di-encode untuk URL WhatsApp
4. WhatsApp terbuka dengan pesan yang sudah terformat
5. User tinggal mengirim pesan ke nomor toko
