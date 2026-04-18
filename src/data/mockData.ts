export interface Store {
  id: string;
  name: string;
  phone: string;
  description: string;
  logo: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  storeId: string;
}

export const CATEGORIES = [
  "All",
  "T-Shirts",
  "Jeans",
  "Dresses",
  "Jackets",
  "Shoes",
  "Accessories",
] as const;

export const stores: Store[] = [
  {
    id: "store-1",
    name: "Urban Thread",
    phone: "5511999990001",
    description: "Contemporary streetwear for the modern wardrobe.",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
  },
  {
    id: "store-2",
    name: "Moda Bella",
    phone: "5511999990002",
    description: "Elegant fashion pieces for every occasion.",
    logo: "https://images.unsplash.com/photo-1528698827591-e19cef791f48?w=200&h=200&fit=crop",
  },
  {
    id: "store-3",
    name: "Denim Co.",
    phone: "5511999990003",
    description: "Premium denim and casual essentials.",
    logo: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200&h=200&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic White Tee",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    category: "T-Shirts",
    storeId: "store-1",
  },
  {
    id: "prod-2",
    name: "Slim Fit Dark Jeans",
    price: 189.9,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=800&fit=crop",
    category: "Jeans",
    storeId: "store-3",
  },
  {
    id: "prod-3",
    name: "Floral Summer Dress",
    price: 159.9,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    category: "Dresses",
    storeId: "store-2",
  },
  {
    id: "prod-4",
    name: "Leather Biker Jacket",
    price: 399.9,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    category: "Jackets",
    storeId: "store-1",
  },
  {
    id: "prod-5",
    name: "Canvas Sneakers",
    price: 129.9,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop",
    category: "Shoes",
    storeId: "store-1",
  },
  {
    id: "prod-6",
    name: "Striped Polo Shirt",
    price: 79.9,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop",
    category: "T-Shirts",
    storeId: "store-2",
  },
  {
    id: "prod-7",
    name: "Wide Leg Jeans",
    price: 199.9,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    category: "Jeans",
    storeId: "store-3",
  },
  {
    id: "prod-8",
    name: "Gold Chain Necklace",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1599643478518-a76f5183da3f?w=600&h=800&fit=crop",
    category: "Accessories",
    storeId: "store-2",
  },
  {
    id: "prod-9",
    name: "Oversized Hoodie",
    price: 139.9,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
    category: "Jackets",
    storeId: "store-1",
  },
  {
    id: "prod-10",
    name: "Mini Crossbody Bag",
    price: 119.9,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    category: "Accessories",
    storeId: "store-2",
  },
  {
    id: "prod-11",
    name: "Linen Button-Up",
    price: 99.9,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    category: "T-Shirts",
    storeId: "store-3",
  },
  {
    id: "prod-12",
    name: "High-Top Boots",
    price: 249.9,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
    category: "Shoes",
    storeId: "store-3",
  },
];

export function getStoreById(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}

export function getProductsByStore(storeId: string): Product[] {
  return products.filter((p) => p.storeId === storeId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

export function buildWhatsAppUrl(phone: string, productName: string, price: number): string {
  const message = encodeURIComponent(
    `Hello, I'm interested in this product: ${productName} - ${formatPrice(price)}`
  );
  return `https://wa.me/${phone}?text=${message}`;
}
