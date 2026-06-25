export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  brand: string;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badges?: string[];
  colors?: ProductColor[];
  variants?: string[];
  description: string;
  specs: ProductSpecs;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

// Data

export const categories: Category[] = [
  {
    id: "smartphone",
    name: "Smartphone",
    icon: "Smartphone",
    description: "Ponsel flagship & mid-range terbaru",
    count: 24,
  },
  {
    id: "laptop",
    name: "Laptop",
    icon: "Laptop",
    description: "Workstation, gaming, ultrabook",
    count: 18,
  },
  {
    id: "smartwatch",
    name: "Smartwatch",
    icon: "Watch",
    description: "Jam pintar untuk gaya & kebugaran",
    count: 12,
  },
  {
    id: "aksesoris",
    name: "Aksesoris",
    icon: "Headphones",
    description: "Audio, charger, dan periferal premium",
    count: 36,
  },
];

export const brands: string[] = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "ASUS",
  "Lenovo",
  "Sony",
  "JBL",
  "Logitech",
];

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "Iphone 15 Pro 256GB",
    category: "smartphone",
    brand: "Apple",
    price: 18999000,
    originalPrice: 21999000,
    rating: 4.9,
    reviews: 1284,
    stock: 12,
    badges: ["best-seller", "discount"],
    colors: [
      { name: "Natural Titanium", hex: "#8e8e93" },
      { name: "Blue Titanium", hex: "#395b7a" },
      { name: "White Titanium", hex: "#f0efea" },
      { name: "Black Titanium", hex: "#3c3c42" },
    ],
    variants: ["128GB", "256GB", "512GB", "1TB"],
    description:
      "Iphone 15 Pro hadir dengan chip A17 Pro yang revolusioner, bodi titanium ringan, dan sistem kamera Pro terbaik yang pernah ada di Iphone.",
    specs: {
      Layar: '6,1" Super Retina XDR ProMotion 120Hz',
      Chipset: "Apple A17 Pro (3nm)",
      RAM: "8 GB",
      Penyimpanan: "256 GB",
      "Kamera Utama": "48MP + 12MP UW + 12MP Tele 3x",
      Baterai: "3.274 mAh, USB-C",
      OS: "IOS 17",
      Berat: "187 gram",
    },
  },

  {
    id: "macbook-pro-m3",
    name: 'MacBook Pro 14" M3 Pro',
    category: "laptop",
    brand: "Apple",
    price: 32999000,
    originalPrice: 34999000,
    rating: 4.9,
    reviews: 642,
    stock: 8,
    badges: ["best-seller", "new"],
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    variants: ["18GB / 512GB", "18GB / 1TB", "36GB / 1TB"],
    description:
      "Performa profesional dengan chip M3 Pro, layar Liquid Retina XDR, dan daya tahan baterai hingga 18 jam.",
    specs: {
      Layar: '14,2" Liquid Retina XDR, 120Hz',
      Chipset: "Apple M3 Pro (11-core CPU, 14-core GPU)",
      RAM: "18 GB Unified",
      Penyimpanan: "512 GB SSD",
      Baterai: "70 Wh, hingga 18 jam",
      Port: "3× TB4, HDMI, SDXC, MagSafe 3",
      Berat: "1,61 kg",
      OS: "macOS Sonoma",
    },
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB",
    category: "smartphone",
    brand: "Samsung",
    price: 19499000,
    originalPrice: 22999000,
    rating: 4.8,
    reviews: 957,
    stock: 15,
    badges: ["discount"],
    colors: [
      { name: "Titanium Black", hex: "#2C2C2E" },
      { name: "Titanium Gray", hex: "#8E8E93" },
      { name: "Titanium Violet", hex: "#7E6BAF" },
    ],
    variants: ["256GB", "512GB", "1TB"],
    description:
      "Galaxy AI hadir di kantong Anda. Bodi titanium, kamera 200MP, dan S Pen presisi tinggi.",
    specs: {
      Layar: '6,8" Dynamic AMOLED 2X 120Hz',
      Chipset: "Snapdragon 8 Gen 3 for Galaxy",
      RAM: "12 GB",
      Penyimpanan: "512 GB",
      "Kamera Utama": "200MP + 12MP UW + 50MP 5x + 10MP 3x",
      Baterai: "5.000 mAh, 45W",
      OS: "One UI 6 (Android 14)",
      Berat: "232 gram",
    },
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 49mm",
    category: "smartwatch",
    brand: "Apple",
    price: 14499000,
    originalPrice: 15999000,
    rating: 4.8,
    reviews: 412,
    stock: 9,
    badges: ["new"],
    colors: [
      { name: "Natural Titanium", hex: "#8E8E93" },
      { name: "Black Titanium", hex: "#1D1D1F" },
    ],
    variants: ["Alpine Loop", "Trail Loop", "Ocean Band"],
    description:
      "Jam paling tangguh dari Apple. Bezel titanium, layar paling terang, dan baterai hingga 36 jam.",
    specs: {
      Layar: "49mm Always-On Retina, 3.000 nits",
      Chipset: "Apple S9 SiP",
      "Tahan Air": "100 meter (WR100)",
      Baterai: "36 jam (72 jam mode hemat)",
      Konektivitas: "GPS + Cellular, Wi-Fi, BT 5.3",
      Sensor: "Detak jantung, ECG, O2 darah, suhu",
    },
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless",
    category: "aksesoris",
    brand: "Sony",
    price: 4799000,
    originalPrice: 5499000,
    rating: 4.9,
    reviews: 2034,
    stock: 22,
    badges: ["best-seller", "discount"],
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#D1D1D6" },
      { name: "Midnight Blue", hex: "#1F3A57" },
    ],
    variants: ["Standard"],
    description:
      "Standar baru untuk Active Noise Cancelling. Suara hi-res, baterai 30 jam, dan kenyamanan seharian.",
    specs: {
      Driver: "30mm Carbon Fiber Composite",
      "Noise Cancelling": "Dual Processor V1 + QN1",
      Baterai: "30 jam (ANC On)",
      Pengisian: "USB-C, 3 menit = 3 jam",
      Konektivitas: "Bluetooth 5.2, LDAC, Multipoint",
      Berat: "250 gram",
    },
  },
  {
    id: "rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14 (2024)",
    category: "laptop",
    brand: "ASUS",
    price: 28999000,
    originalPrice: 30999000,
    rating: 4.7,
    reviews: 318,
    stock: 6,
    badges: ["new"],
    colors: [
      { name: "Eclipse Gray", hex: "#3C3C42" },
      { name: "Platinum White", hex: "#F0EFEA" },
    ],
    variants: ["RTX 4060", "RTX 4070"],
    description:
      "Laptop gaming ultra-tipis dengan layar OLED 120Hz dan AniMe Matrix™ Display yang ikonik.",
    specs: {
      Layar: '14" 3K OLED 120Hz, 100% DCI-P3',
      Chipset: "AMD Ryzen 9 8945HS",
      GPU: "NVIDIA GeForce RTX 4070 8GB",
      RAM: "16 GB DDR5-5600",
      Penyimpanan: "1 TB PCIe 4.0 NVMe SSD",
      Baterai: "73 Wh",
      Berat: "1,5 kg",
    },
  },
  {
    id: "xiaomi-14-pro",
    name: "Xiaomi 14 Pro 12/256GB",
    category: "smartphone",
    brand: "Xiaomi",
    price: 12499000,
    originalPrice: 13999000,
    rating: 4.7,
    reviews: 561,
    stock: 18,
    badges: ["discount"],
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "White", hex: "#F5F5F7" },
      { name: "Green", hex: "#2F4F4F" },
    ],
    variants: ["8/256GB", "12/256GB", "16/512GB"],
    description:
      "Kemitraan Leica generasi baru. Quad-curved display, sensor LYT-900 1 inch, dan pengisian HyperCharge 120W.",
    specs: {
      Layar: '6,73" LTPO AMOLED 120Hz, 3000 nits',
      Chipset: "Snapdragon 8 Gen 3",
      RAM: "12 GB LPDDR5X",
      Penyimpanan: "256 GB UFS 4.0",
      "Kamera Utama": "50MP Leica Vario-Summilux",
      Baterai: "4.880 mAh, 120W HyperCharge",
      OS: "HyperOS (Android 14)",
    },
  },
  {
    id: "galaxy-watch6-classic",
    name: "Samsung Galaxy Watch6 Classic 47mm",
    category: "smartwatch",
    brand: "Samsung",
    price: 5299000,
    originalPrice: 6499000,
    rating: 4.6,
    reviews: 287,
    stock: 14,
    badges: ["discount"],
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#D1D1D6" },
    ],
    variants: ["Bluetooth", "LTE"],
    description:
      "Bezel berputar klasik kembali. Wear OS 4, sensor BioActive, dan pengalaman premium untuk gaya hidup aktif.",
    specs: {
      Layar: '1,5" Super AMOLED, Always-On',
      Chipset: "Exynos W930 Dual-Core 1.4GHz",
      RAM: "2 GB",
      Penyimpanan: "16 GB",
      Baterai: "425 mAh, hingga 40 jam",
      "Tahan Air": "5 ATM + IP68",
      OS: "Wear OS 4 + One UI Watch 5",
    },
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    category: "aksesoris",
    brand: "Logitech",
    price: 1799000,
    originalPrice: 1999000,
    rating: 4.9,
    reviews: 1875,
    stock: 30,
    badges: ["best-seller"],
    colors: [
      { name: "Graphite", hex: "#3C3C42" },
      { name: "Pale Gray", hex: "#D1D1D6" },
    ],
    variants: ["Standard"],
    description:
      "Mouse produktivitas paling presisi. Sensor 8K DPI, klik senyap, dan kompatibel multi-perangkat.",
    specs: {
      Sensor: "Darkfield 8.000 DPI",
      Tombol: "7 (klik senyap)",
      Konektivitas: "Bluetooth LE, Logi Bolt USB",
      Baterai: "Hingga 70 hari",
      Pengisian: "USB-C, 1 menit = 3 jam",
      Berat: "141 gram",
    },
  },
  {
    id: "jbl-flip-6",
    name: "JBL Flip 6 Portable Speaker",
    category: "aksesoris",
    brand: "JBL",
    price: 1499000,
    originalPrice: 1799000,
    rating: 4.8,
    reviews: 942,
    stock: 25,
    badges: ["discount"],
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "Blue", hex: "#1F3A57" },
      { name: "Red", hex: "#A02828" },
      { name: "Teal", hex: "#2F7F8F" },
    ],
    variants: ["Standard"],
    description:
      "Suara JBL Original Pro Sound bertenaga dalam genggaman. Tahan air & debu IP67, baterai 12 jam.",
    specs: {
      "Daya Output": "30W RMS",
      "Frequency Response": "63Hz - 20kHz",
      Konektivitas: "Bluetooth 5.1",
      Baterai: "12 jam playback",
      "Tahan Air": "IP67",
      Berat: "550 gram",
    },
  },
  {
    id: "lenovo-legion-pro-7i",
    name: "Lenovo Legion Pro 7i Gen 9",
    category: "laptop",
    brand: "Lenovo",
    price: 36999000,
    originalPrice: 39999000,
    rating: 4.8,
    reviews: 142,
    stock: 5,
    badges: ["new", "discount"],
    colors: [{ name: "Eclipse Black", hex: "#1D1D1F" }],
    variants: ["RTX 4080", "RTX 4090"],
    description:
      "Tenaga gaming desktop dalam bentuk laptop. Intel Core i9 HX, RTX 4090, dan pendingin Coldfront 5.0.",
    specs: {
      Layar: '16" PureSight WQXGA 240Hz',
      Chipset: "Intel Core i9-14900HX",
      GPU: "NVIDIA GeForce RTX 4090 16GB",
      RAM: "32 GB DDR5-5600",
      Penyimpanan: "1 TB PCIe 4.0 NVMe",
      Baterai: "99,9 Wh",
      Berat: "2,8 kg",
    },
  },
  {
    id: "apple-airpods-pro-2",
    name: "AirPods Pro (USB-C) Gen 2",
    category: "aksesoris",
    brand: "Apple",
    price: 3899000,
    originalPrice: 4299000,
    rating: 4.9,
    reviews: 3210,
    stock: 40,
    badges: ["best-seller"],
    colors: [{ name: "White", hex: "#F5F5F7" }],
    variants: ["Standard"],
    description:
      "ANC adaptif generasi baru, MagSafe USB-C, audio Personalized Spatial Audio yang imersif.",
    specs: {
      Chipset: "Apple H2",
      ANC: "Adaptive Audio + Conversation Awareness",
      Baterai: "6 jam (30 jam dengan case)",
      Pengisian: "USB-C, MagSafe, Qi",
      Konektivitas: "Bluetooth 5.3",
      Tahan: "IP54 (earbuds & case)",
    },
  },
];

// HELPER FUNCTION

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoyId: String): Product[] =>
  products.filter((p) => p.category === categoyId);

export const getBestSellers = (): Product[] =>
  products.filter((p) => p.badges?.includes("best-seller"));

export const getNewArrivals = (): Product[] =>
  products.filter((p) => p.badges?.includes("new"));

export const dummyOrders: Order[] = [
  {
    id: "MRG-240115-0042",
    date: "15 Jan 2026",
    status: "Selesai",
    total: 18999000,
    items: [{ id: "iphone-15-pro", name: "iPhone 15 Pro 256GB", qty: 1 }],
  },
  {
    id: "MRG-240108-0019",
    date: "08 Jan 2026",
    status: "Dikirim",
    total: 4799000,
    items: [{ id: "sony-wh1000xm5", name: "Sony WH-1000XM5", qty: 1 }],
  },
  {
    id: "MRG-231220-0007",
    date: "20 Des 2025",
    status: "Diproses",
    total: 35798000,
    items: [
      { id: "macbook-pro-m3", name: 'MacBook Pro 14" M3 Pro', qty: 1 },
      { id: "logitech-mx-master-3s", name: "Logitech MX Master 3S", qty: 1 },
      { id: "apple-airpods-pro-2", name: "AirPods Pro (USB-C) Gen 2", qty: 1 },
    ],
  },
];
