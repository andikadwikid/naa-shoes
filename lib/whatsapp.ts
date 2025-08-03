import { CartItem } from "../types/product";
import { WhatsAppConfig } from "../types/ui";

// Default WhatsApp configuration
export const defaultWhatsAppConfig: WhatsAppConfig = {
  number: "6281294556327",
  storeName: "NAA Shoes",
  messageTemplate: {
    greeting: "Halo! Saya tertarik untuk membeli sepatu dari",
    closing:
      "Mohon informasi lebih lanjut untuk proses pemesanan. Terima kasih!",
  },
};

// Helper function to format price in Indonesian Rupiah
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Helper function to format WhatsApp number
export const formatWhatsAppNumber = (number: string): string => {
  // Remove non-digit characters
  const cleanNumber = number.replace(/\D/g, "");

  // Ensure it starts with 62 (Indonesia country code)
  if (cleanNumber.startsWith("0")) {
    return "62" + cleanNumber.slice(1);
  } else if (!cleanNumber.startsWith("62")) {
    return "62" + cleanNumber;
  }

  return cleanNumber;
};

// Generate WhatsApp message from cart items
export const generateWhatsAppMessage = (
  cartItems: CartItem[],
  totalItems: number,
  totalPrice: number,
  config: WhatsAppConfig = defaultWhatsAppConfig
): string => {
  let message = `${config.messageTemplate.greeting} ${config.storeName}:\n\n`;

  // Product details
  message += `📦 *DETAIL PESANAN:*\n`;
  cartItems.forEach((item, index) => {
    message += `\n${index + 1}. *${item.product.name}*\n`;
    message += `   👟 Size: ${item.selectedSize}\n`;
    message += `   🎨 Color: ${item.selectedColor}\n`;
    message += `   📦 Qty: ${item.quantity}\n`;
    message += `   💰 ${formatPrice(item.product.price)} x ${
      item.quantity
    } = *${formatPrice(item.product.price * item.quantity)}*\n`;
  });

  // Summary
  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *RINGKASAN:*\n`;
  message += `Total Items: ${totalItems}\n`;
  message += `💸 *Total Price: ${formatPrice(totalPrice)}*\n\n`;
  message += `${config.messageTemplate.closing}`;

  return message;
};

// Generate complete WhatsApp URL
export const generateWhatsAppLink = (
  cartItems: CartItem[],
  totalItems: number,
  totalPrice: number,
  config: WhatsAppConfig = defaultWhatsAppConfig
): string => {
  const message = generateWhatsAppMessage(
    cartItems,
    totalItems,
    totalPrice,
    config
  );
  const encodedMessage = encodeURIComponent(message);
  const formattedNumber = formatWhatsAppNumber(config.number);

  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
};

// Validate WhatsApp number format
export const validateWhatsAppNumber = (number: string): boolean => {
  const cleanNumber = number.replace(/\D/g, "");
  // Indonesian mobile numbers should be 10-13 digits after country code
  return /^62\d{9,12}$/.test(cleanNumber);
};

// Get default WhatsApp config (can be overridden)
export const getWhatsAppConfig = (): WhatsAppConfig => {
  // In a real app, this could read from environment variables or config file
  return {
    ...defaultWhatsAppConfig,
    number:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultWhatsAppConfig.number,
    storeName:
      process.env.NEXT_PUBLIC_STORE_NAME || defaultWhatsAppConfig.storeName,
  };
};
