// utils/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  warranty: string;
  inStock: boolean;
  stockQuantity: number;
  color?: string[];
  brand?: string;
  shippingInfo?: {
    delivery: string;
    returnPolicy: string;
    securePayment: boolean;
  };
  reviewsList?: {
    name: string;
    comment: string;
    rating: number;
    date: string;
    avatar: string;
  }[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Modern Sofa Set",
    price: 1299.99,
    originalPrice: 1599.99,
    category: "living",
    image: "/PICTURES/_DEV1448.jpg",
    images: [
      "/PICTURES/_DEV1448.jpg",
      "/PICTURES/_DEV1454.jpg",
      "/PICTURES/_DEV1460.jpg",
      "/PICTURES/_DEV1463.jpg",
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestSeller: true,
    description:
      "Contemporary 3-seater sofa with premium fabric and wooden legs. Designed for ultimate comfort and style, this sofa set transforms your living space into a modern oasis.",
    features: [
      "Premium fabric upholstery",
      "Solid wood frame construction",
      "High-density foam cushions",
      "Easy to clean and maintain",
      "Stain-resistant material",
      "Modular design options",
    ],
    dimensions: "84'' W x 36'' D x 32'' H",
    material: "Premium Fabric, Solid Wood, High-Density Foam",
    warranty: "2 years comprehensive warranty",
    inStock: true,
    stockQuantity: 15,
    color: ["Charcoal Gray", "Navy Blue", "Beige"],
    brand: "Luxury Living",
    shippingInfo: {
      delivery: "Delivery in 3-5 business days",
      returnPolicy: "30 days money back guarantee",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "Sarah Johnson",
        comment:
          "Absolutely love this sofa! The quality is exceptional and it's incredibly comfortable. Perfect for our family movie nights.",
        rating: 5,
        date: "Nov 15, 2024",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Mike Chen",
        comment:
          "Great value for money. The assembly was straightforward and the materials feel premium. Highly recommended!",
        rating: 4,
        date: "Nov 10, 2024",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        name: "Emily Davis",
        comment:
          "Beautiful design but the delivery took longer than expected. Otherwise, very satisfied with the purchase.",
        rating: 4,
        date: "Nov 5, 2024",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
    ],
  },
  {
    id: 2,
    name: "Scandinavian Dining Table",
    price: 899.99,
    originalPrice: 1099.99,
    category: "dining",
    image: "/PICTURES/_DEV1454.jpg",
    images: [
      "/PICTURES/_DEV1454.jpg",
      "/PICTURES/_DEV1460.jpg",
      "/PICTURES/_DEV1463.jpg",
      "/PICTURES/_DEV1469.jpg",
    ],
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isBestSeller: true,
    description:
      "Minimalist oak dining table with clean lines and natural finish. Perfect for family dinners and entertaining guests in style.",
    features: [
      "Solid oak wood construction",
      "Water-resistant natural finish",
      "Easy 30-minute assembly",
      "Scandinavian minimalist design",
      "Sturdy and durable",
      "Eco-friendly materials",
    ],
    dimensions: "72'' L x 36'' W x 30'' H",
    material: "Solid Oak Wood, Metal Hardware",
    warranty: "3 years structural warranty",
    inStock: true,
    stockQuantity: 8,
    color: ["Natural Oak", "Walnut Finish", "White Wash"],
    brand: "Nordic Design",
    shippingInfo: {
      delivery: "Delivery in 5-7 business days",
      returnPolicy: "45 days return policy",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "David Wilson",
        comment:
          "Stunning table! The oak quality is superb and it's very sturdy. Perfect size for our dining room.",
        rating: 5,
        date: "Nov 12, 2024",
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      {
        name: "Lisa Thompson",
        comment:
          "Beautiful craftsmanship. The table arrived well-packaged and assembly was straightforward.",
        rating: 4,
        date: "Nov 8, 2024",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
    ],
  },
  {
    id: 3,
    name: "Luxury King Bed Frame",
    price: 1899.99,
    originalPrice: 2299.99,
    category: "bedroom",
    image: "/PICTURES/_DEV1460.jpg",
    images: [
      "/PICTURES/_DEV1460.jpg",
      "/PICTURES/_DEV1463.jpg",
      "/PICTURES/_DEV1469.jpg",
      "/PICTURES/_DEV1472.jpg",
    ],
    rating: 4.9,
    reviews: 156,
    isNew: true,
    isBestSeller: false,
    description:
      "Upholstered king size bed with built-in storage and premium tufted headboard. Experience luxury and functionality combined.",
    features: [
      "Built-in storage drawers",
      "Premium tufted headboard",
      "Solid wood frame construction",
      "Easy under-bed cleaning access",
      "Noise-free assembly",
      "LED lighting option",
    ],
    dimensions: "84'' W x 86'' D x 48'' H",
    material: "Premium Fabric, Solid Wood, Metal Drawers",
    warranty: "5 years comprehensive warranty",
    inStock: true,
    stockQuantity: 6,
    color: ["Charcoal Gray", "Navy Blue", "Cream White"],
    brand: "Royal Comfort",
    shippingInfo: {
      delivery: "Delivery in 7-10 business days",
      returnPolicy: "60 days luxury return policy",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "Robert Martinez",
        comment:
          "This bed is absolutely amazing! The storage drawers are a game-changer and the quality is exceptional.",
        rating: 5,
        date: "Nov 18, 2024",
        avatar: "https://i.pravatar.cc/100?img=6",
      },
      {
        name: "Amanda Clark",
        comment:
          "Worth every penny! The bed is incredibly sturdy and the headboard is so comfortable for reading.",
        rating: 5,
        date: "Nov 14, 2024",
        avatar: "https://i.pravatar.cc/100?img=7",
      },
      {
        name: "Kevin Lee",
        comment:
          "Excellent bed frame. The assembly took some time but the instructions were clear.",
        rating: 4,
        date: "Nov 9, 2024",
        avatar: "https://i.pravatar.cc/100?img=8",
      },
    ],
  },
  {
    id: 4,
    name: "Executive Office Chair",
    price: 499.99,
    originalPrice: 649.99,
    category: "office",
    image: "/PICTURES/_DEV1463.jpg",
    images: [
      "/PICTURES/_DEV1463.jpg",
      "/PICTURES/_DEV1469.jpg",
      "/PICTURES/_DEV1472.jpg",
      "/PICTURES/_DEV1486.jpg",
    ],
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isBestSeller: true,
    description:
      "Ergonomic office chair with advanced lumbar support and adjustable features. Designed for all-day comfort during work.",
    features: [
      "Advanced lumbar support system",
      "Adjustable height and armrests",
      "360-degree swivel base",
      "Breathable mesh backrest",
      "Synchronized tilt mechanism",
      "Heavy-duty casters",
    ],
    dimensions: "26'' W x 26'' D x 45'' H",
    material: "Premium Mesh, Aluminum Base, PU Leather",
    warranty: "5 years warranty",
    inStock: true,
    stockQuantity: 20,
    color: ["Black Mesh", "Gray Mesh", "Brown Leather"],
    brand: "ErgoPro",
    shippingInfo: {
      delivery: "Delivery in 2-4 business days",
      returnPolicy: "30 days trial period",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "Jennifer Brown",
        comment:
          "Best office chair I've ever owned! My back pain has significantly reduced since using this chair.",
        rating: 5,
        date: "Nov 20, 2024",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      {
        name: "Thomas Anderson",
        comment:
          "Excellent build quality and very comfortable. Perfect for long working hours.",
        rating: 5,
        date: "Nov 16, 2024",
        avatar: "https://i.pravatar.cc/100?img=10",
      },
      {
        name: "Maria Garcia",
        comment:
          "Good chair overall, but the armrests could be more adjustable. Still very comfortable.",
        rating: 4,
        date: "Nov 11, 2024",
        avatar: "https://i.pravatar.cc/100?img=11",
      },
    ],
  },
  {
    id: 5,
    name: "Outdoor Lounge Set",
    price: 1599.99,
    originalPrice: 1999.99,
    category: "outdoor",
    image: "/PICTURES/_DEV1469.jpg",
    images: [
      "/PICTURES/_DEV1469.jpg",
      "/PICTURES/_DEV1472.jpg",
      "/PICTURES/_DEV1486.jpg",
      "/PICTURES/_DEV1493.jpg",
    ],
    rating: 4.5,
    reviews: 67,
    isNew: true,
    isBestSeller: false,
    description:
      "Weather-resistant rattan furniture set with comfortable cushions. Create your perfect outdoor living space with this elegant set.",
    features: [
      "All-weather rattan construction",
      "UV-protected cushions",
      "Water-resistant fabric",
      "Modular design flexibility",
      "Easy to clean and maintain",
      "Rust-resistant aluminum frame",
    ],
    dimensions: "Sofa: 35'' H x 60'' W, Chair: 32'' H x 28'' W",
    material: "Synthetic Rattan, Aluminum, Outdoor Fabric",
    warranty: "2 years weather warranty",
    inStock: true,
    stockQuantity: 4,
    color: ["Dark Brown", "Light Gray", "Espresso"],
    brand: "Garden Living",
    shippingInfo: {
      delivery: "Delivery in 10-14 business days",
      returnPolicy: "90 days outdoor furniture return",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "Christopher Taylor",
        comment:
          "Perfect for our patio! The set is comfortable and has held up well through rain and sun.",
        rating: 5,
        date: "Nov 17, 2024",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      {
        name: "Michelle White",
        comment:
          "Beautiful outdoor set. The cushions are very comfortable and the quality is excellent.",
        rating: 4,
        date: "Nov 13, 2024",
        avatar: "https://i.pravatar.cc/100?img=13",
      },
      {
        name: "Daniel Harris",
        comment:
          "Great value for money. Assembly was a bit challenging but the result is stunning.",
        rating: 4,
        date: "Nov 7, 2024",
        avatar: "https://i.pravatar.cc/100?img=14",
      },
    ],
  },
  {
    id: 6,
    name: "Premium Coffee Table",
    price: 399.99,
    originalPrice: 499.99,
    category: "living",
    image: "/PICTURES/_DEV1472.jpg",
    images: [
      "/PICTURES/_DEV1472.jpg",
      "/PICTURES/_DEV1486.jpg",
      "/PICTURES/_DEV1493.jpg",
      "/PICTURES/_DEV1505.jpg",
    ],
    rating: 4.4,
    reviews: 78,
    isNew: false,
    isBestSeller: false,
    description:
      "Nested coffee tables with tempered glass top and modern metal frame. Perfect for contemporary living rooms.",
    features: [
      "Tempered safety glass top",
      "Powder-coated metal frame",
      "Nested space-saving design",
      "Easy to move and clean",
      "Scratch-resistant surface",
      "Modern geometric design",
    ],
    dimensions: "Large: 24'' H x 24'' W, Small: 18'' H x 18'' W",
    material: "Tempered Glass, Powder-coated Metal",
    warranty: "1 year warranty",
    inStock: true,
    stockQuantity: 12,
    color: ["Chrome", "Matte Black", "Bronze"],
    brand: "Modern Living",
    shippingInfo: {
      delivery: "Delivery in 3-5 business days",
      returnPolicy: "30 days return policy",
      securePayment: true,
    },
    reviewsList: [
      {
        name: "Jessica Martin",
        comment:
          "Love the modern look! The glass is very sturdy and easy to clean.",
        rating: 5,
        date: "Nov 19, 2024",
        avatar: "https://i.pravatar.cc/100?img=15",
      },
      {
        name: "Richard Moore",
        comment:
          "Good quality tables. The nested design saves a lot of space in our small living room.",
        rating: 4,
        date: "Nov 15, 2024",
        avatar: "https://i.pravatar.cc/100?img=16",
      },
    ],
  },
];

export const categories = [
  { id: "all", name: "All Products", count: 45 },
  { id: "living", name: "Living Room", count: 15 },
  { id: "bedroom", name: "Bedroom", count: 12 },
  { id: "dining", name: "Dining", count: 8 },
  { id: "office", name: "Office", count: 6 },
  { id: "outdoor", name: "Outdoor", count: 4 },
];

export const allProducts = products;
