export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "laptops" | "components" | "accessories" | "mobile" | "repair";
  subcategory: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  badge?: string;
  rating: number;
  reviews: number;
  specs: { ram?: string; processor?: string; storage?: string; display?: string; gpu?: string };
  description: string;
  inStock: boolean;
};

import laptopImg from "@/assets/cat-laptops.jpg";
import compImg from "@/assets/cat-components.jpg";
import accImg from "@/assets/cat-accessories.jpg";
import mobImg from "@/assets/cat-mobile.jpg";

export const PRODUCTS: Product[] = [
  {
    id: "1", slug: "rog-strix-g16", name: "ROG Strix G16 Gaming Laptop", brand: "ASUS",
    category: "laptops", subcategory: "Gaming", price: 285000, oldPrice: 320000,
    image: laptopImg, badge: "Best Seller", rating: 4.8, reviews: 142,
    specs: { ram: "32GB DDR5", processor: "Intel Core i9-14900HX", storage: "1TB NVMe SSD", display: "16\" QHD+ 240Hz", gpu: "RTX 4070" },
    description: "Unleash relentless performance with the ROG Strix G16. Engineered for elite gaming and creative workloads.",
    inStock: true,
  },
  {
    id: "2", slug: "macbook-pro-m4", name: "MacBook Pro 14\" M4", brand: "Apple",
    category: "laptops", subcategory: "Ultrabook", price: 320000,
    image: laptopImg, badge: "New", rating: 4.9, reviews: 88,
    specs: { ram: "16GB Unified", processor: "Apple M4 Pro", storage: "512GB SSD", display: "14.2\" Liquid Retina XDR" },
    description: "The most powerful MacBook Pro ever, built on Apple silicon for breathtaking performance.",
    inStock: true,
  },
  {
    id: "3", slug: "rtx-4080-super", name: "GeForce RTX 4080 SUPER", brand: "NVIDIA",
    category: "components", subcategory: "GPU", price: 175000,
    image: compImg, badge: "Hot", rating: 4.9, reviews: 64,
    specs: { processor: "AD103", storage: "16GB GDDR6X", display: "PCIe 4.0" },
    description: "Cutting-edge ray tracing and DLSS 3.5 for cinematic 4K gaming and AI workloads.",
    inStock: true,
  },
  {
    id: "4", slug: "ryzen-9-7950x", name: "AMD Ryzen 9 7950X", brand: "AMD",
    category: "components", subcategory: "CPU", price: 95000,
    image: compImg, rating: 4.7, reviews: 51,
    specs: { processor: "16C/32T 5.7GHz", ram: "DDR5 5200", storage: "Socket AM5" },
    description: "Flagship Zen 4 desktop CPU. Effortless multi-threaded dominance.",
    inStock: true,
  },
  {
    id: "5", slug: "keychron-q1-pro", name: "Keychron Q1 Pro Wireless", brand: "Keychron",
    category: "accessories", subcategory: "Keyboard", price: 28000, oldPrice: 32000,
    image: accImg, rating: 4.8, reviews: 233,
    specs: {},
    description: "Premium aluminum wireless mechanical keyboard with hot-swappable switches.",
    inStock: true,
  },
  {
    id: "6", slug: "logitech-mx-master-3s", name: "Logitech MX Master 3S", brand: "Logitech",
    category: "accessories", subcategory: "Mouse", price: 13500,
    image: accImg, badge: "Editor's Pick", rating: 4.9, reviews: 412,
    specs: {},
    description: "Iconic precision mouse for power users. 8K DPI, quiet clicks, MagSpeed scrolling.",
    inStock: true,
  },
  {
    id: "7", slug: "iphone-16-pro", name: "iPhone 16 Pro 256GB", brand: "Apple",
    category: "mobile", subcategory: "Smartphone", price: 215000,
    image: mobImg, badge: "New", rating: 4.9, reviews: 89,
    specs: { processor: "A18 Pro", storage: "256GB", display: "6.3\" ProMotion OLED", ram: "8GB" },
    description: "Titanium design, A18 Pro chip, Apple Intelligence. The pinnacle of iPhone.",
    inStock: true,
  },
  {
    id: "8", slug: "samsung-s25-ultra", name: "Samsung Galaxy S25 Ultra", brand: "Samsung",
    category: "mobile", subcategory: "Smartphone", price: 198000,
    image: mobImg, rating: 4.8, reviews: 73,
    specs: { processor: "Snapdragon 8 Gen 4", storage: "512GB", display: "6.9\" Dynamic AMOLED 2X", ram: "12GB" },
    description: "Galaxy AI, S Pen, 200MP camera. Built for creators and pros.",
    inStock: true,
  },
  {
    id: "9", slug: "lenovo-legion-9i", name: "Lenovo Legion 9i", brand: "Lenovo",
    category: "laptops", subcategory: "Gaming", price: 410000,
    image: laptopImg, badge: "Premium", rating: 4.9, reviews: 27,
    specs: { ram: "64GB DDR5", processor: "Intel Core i9-14900HX", storage: "2TB NVMe SSD", display: "16\" Mini-LED 165Hz", gpu: "RTX 4090" },
    description: "Hand-crafted forged carbon. The ultimate desktop replacement.",
    inStock: true,
  },
  {
    id: "10", slug: "samsung-990-pro-2tb", name: "Samsung 990 PRO 2TB NVMe", brand: "Samsung",
    category: "components", subcategory: "Storage", price: 32000,
    image: compImg, rating: 4.9, reviews: 188,
    specs: { storage: "2TB PCIe Gen4 7450MB/s" },
    description: "Blazing fast Gen4 NVMe SSD for gamers and creators.",
    inStock: true,
  },
  {
    id: "11", slug: "sony-wh-1000xm5", name: "Sony WH-1000XM5", brand: "Sony",
    category: "accessories", subcategory: "Headphones", price: 45000,
    image: accImg, rating: 4.8, reviews: 521,
    specs: {},
    description: "Industry-leading noise cancellation with crystalline audio.",
    inStock: true,
  },
  {
    id: "12", slug: "google-pixel-9-pro", name: "Google Pixel 9 Pro", brand: "Google",
    category: "mobile", subcategory: "Smartphone", price: 165000,
    image: mobImg, rating: 4.7, reviews: 64,
    specs: { processor: "Tensor G4", storage: "256GB", display: "6.3\" LTPO OLED", ram: "16GB" },
    description: "Gemini AI built-in. The smartest Pixel ever.",
    inStock: true,
  },
  {
    id: "13", slug: "iphone-15-cover", name: "iPhone 15 Silicone Case", brand: "Apple",
    category: "accessories", subcategory: "Phone Cover", price: 4500,
    image: accImg, rating: 4.5, reviews: 150,
    specs: {},
    description: "A delightful way to protect your iPhone.",
    inStock: true,
  },
  {
    id: "14", slug: "samsung-45w-charger", name: "Samsung 45W USB-C Charger", brand: "Samsung",
    category: "accessories", subcategory: "Charger", price: 3500,
    image: accImg, rating: 4.7, reviews: 200,
    specs: {},
    description: "Super Fast Charging to get you back to 100% quickly.",
    inStock: true,
  },
  {
    id: "15", slug: "redmi-note-13", name: "Xiaomi Redmi Note 13", brand: "Xiaomi",
    category: "mobile", subcategory: "Affordable Phone", price: 25000,
    image: mobImg, rating: 4.6, reviews: 300,
    specs: { processor: "Snapdragon 685", storage: "128GB", display: "6.67\" AMOLED", ram: "6GB" },
    description: "Vivid 120Hz AMOLED display and a 108MP main camera.",
    inStock: true,
  },
  {
    id: "16", slug: "cat6-lan-cable-10m", name: "Cat 6 Ethernet Cable (10m)", brand: "Generic",
    category: "accessories", subcategory: "LAN Cable", price: 800,
    image: accImg, rating: 4.8, reviews: 500,
    specs: {},
    description: "High-speed and reliable internet connectivity for your home or office.",
    inStock: true,
  },
  {
    id: "17", slug: "amazon-echo-dot-5", name: "Amazon Echo Dot (5th Gen)", brand: "Amazon",
    category: "accessories", subcategory: "Smart Speaker", price: 6500,
    image: accImg, rating: 4.7, reviews: 1200,
    specs: {},
    description: "Our most popular smart speaker with Alexa.",
    inStock: true,
  },
];

export const CATEGORIES = [
  { slug: "laptops", name: "Laptops", desc: "Gaming · Ultrabook · Workstation", image: laptopImg, sub: ["Gaming", "Ultrabook", "Workstation", "Business"] },
  { slug: "components", name: "PC Components", desc: "GPU · CPU · Storage · RAM", image: compImg, sub: ["GPU", "CPU", "Storage", "RAM", "Motherboard", "Cooling"] },
  { slug: "accessories", name: "Accessories", desc: "Keyboards · Audio · Mice", image: accImg, sub: ["Keyboard", "Mouse", "Headphones", "Monitor", "Webcam", "Phone Cover", "Charger", "LAN Cable", "Smart Speaker"] },
  { slug: "mobile", name: "Mobile", desc: "Smartphones · Tablets · Wearables", image: mobImg, sub: ["Smartphone", "Tablet", "Wearable", "Affordable Phone"] },
  { slug: "repair", name: "Repair Services", desc: "Expert repairs for your gadgets", image: accImg, sub: [] },
] as const;

export const formatNPR = (n: number) => `Rs ${n.toLocaleString("en-IN")}`;
export const WHATSAPP_NUMBER = "9779741740551";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
