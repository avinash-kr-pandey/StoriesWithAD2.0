// utils/products.ts

// ==================== BASE INTERFACES ====================
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  totalProducts: number;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  images: string[];
  description: string;
  totalProducts: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory: string;
  image: string;
  images: string[];
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
  tags?: string[];
}

// ==================== AVAILABLE IMAGES ====================
const AVAILABLE_IMAGES = [
  "/PICTURES/_DEV1448.jpg",
  "/PICTURES/_DEV1454.jpg",
  "/PICTURES/_DEV1460.jpg",
  "/PICTURES/_DEV1463.jpg",
  "/PICTURES/_DEV1469.jpg",
  "/PICTURES/_DEV1472.jpg",
  "/PICTURES/_DEV1486.jpg",
  "/PICTURES/_DEV1493.jpg",
  "/PICTURES/_DEV1505.jpg",
];

// ==================== IMAGE SET GENERATOR ====================
const generateImageSet = (baseIndex: number): string[] => {
  const sets: string[][] = [
    // Sofas & Living Room Style
    [
      AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8],
      AVAILABLE_IMAGES[0]
    ],
    // Dining & Tables
    [
      AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0],
      AVAILABLE_IMAGES[1]
    ],
    // Bedroom & Comfort
    [
      AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2]
    ],
    // Office & Workspace
    [
      AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8],
      AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3]
    ],
    // Outdoor & Garden
    [
      AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0],
      AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4]
    ],
    // Coffee Tables & Side Tables
    [
      AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5]
    ],
    // Storage & Wardrobes
    [
      AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8],
      AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6]
    ],
    // Chairs & Seating
    [
      AVAILABLE_IMAGES[7], AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0],
      AVAILABLE_IMAGES[1], AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4], AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7]
    ],
    // Entertainment & TV Units
    [
      AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8]
    ],
    // Mixed Variety
    [
      AVAILABLE_IMAGES[0], AVAILABLE_IMAGES[2], AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[6], AVAILABLE_IMAGES[8], AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[3], AVAILABLE_IMAGES[5], AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[0]
    ]
  ];
  
  return sets[baseIndex % sets.length];
};

// ==================== CATEGORIES DATA ====================
export const categories: Category[] = [
  {
    id: "living",
    name: "Living Room",
    image: AVAILABLE_IMAGES[0],
    description: "Transform your living space with comfortable and stylish furniture designed for relaxation and entertainment.",
    totalProducts: 25,
    subCategories: [
      {
        id: "sofas",
        name: "Sofas & Couches",
        categoryId: "living",
        images: generateImageSet(0),
        description: "Luxurious sofas and couches in various styles, sizes, and materials for ultimate comfort.",
        totalProducts: 8
      },
      {
        id: "coffee-tables",
        name: "Coffee Tables",
        categoryId: "living",
        images: generateImageSet(1),
        description: "Modern and classic coffee tables that complement your living room decor.",
        totalProducts: 6
      },
      // {
      //   id: "tv-units",
      //   name: "TV Units & Entertainment Centers",
      //   categoryId: "living",
      //   images: generateImageSet(2),
      //   description: "Stylish TV stands and entertainment centers with smart storage solutions.",
      //   totalProducts: 5
      // },
      {
        id: "bookshelves",
        name: "Bookshelves & Display Units",
        categoryId: "living",
        images: generateImageSet(3),
        description: "Elegant shelving units for books, decor, and display items.",
        totalProducts: 6
      }
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: AVAILABLE_IMAGES[2],
    description: "Create your perfect sanctuary with our collection of bedroom furniture for restful sleep and organization.",
    totalProducts: 22,
    subCategories: [
      {
        id: "beds",
        name: "Beds & Mattresses",
        categoryId: "bedroom",
        images: generateImageSet(4),
        description: "Complete bed sets, frames, and premium mattresses for comfortable sleep.",
        totalProducts: 7
      },
      {
        id: "wardrobes",
        name: "Wardrobes & Closets",
        categoryId: "bedroom",
        images: generateImageSet(5),
        description: "Spacious wardrobes and closet systems for organized storage.",
        totalProducts: 6
      },
      {
        id: "dressers",
        name: "Dressers & Drawers",
        categoryId: "bedroom",
        images: generateImageSet(6),
        description: "Stylish dressers and chests of drawers for bedroom storage.",
        totalProducts: 5
      },
      {
        id: "nightstands",
        name: "Nightstands & Bedside Tables",
        categoryId: "bedroom",
        images: generateImageSet(7),
        description: "Functional and elegant bedside tables with storage.",
        totalProducts: 4
      }
    ]
  },
  {
    id: "dining",
    name: "Dining Room",
    image: AVAILABLE_IMAGES[1],
    description: "Elegant dining furniture that brings family and friends together for memorable meals and gatherings.",
    totalProducts: 18,
    subCategories: [
      {
        id: "dining-tables",
        name: "Dining Tables",
        categoryId: "dining",
        images: generateImageSet(8),
        description: "Beautiful dining tables in various styles and sizes for family dining.",
        totalProducts: 6
      },
      {
        id: "dining-chairs",
        name: "Dining Chairs",
        categoryId: "dining",
        images: generateImageSet(9),
        description: "Comfortable and stylish dining chairs to complement your table.",
        totalProducts: 8
      },
      {
        id: "buffets",
        name: "Buffets & Sideboards",
        categoryId: "dining",
        images: generateImageSet(0),
        description: "Storage solutions for dining room essentials and display.",
        totalProducts: 4
      }
    ]
  },
  {
    id: "office",
    name: "Office",
    image: AVAILABLE_IMAGES[3],
    description: "Boost productivity with ergonomic and stylish office furniture designed for comfort and efficiency.",
    totalProducts: 15,
    subCategories: [
      {
        id: "office-chairs",
        name: "Office Chairs",
        categoryId: "office",
        images: generateImageSet(1),
        description: "Ergonomic office chairs for all-day comfort and support.",
        totalProducts: 5
      },
      {
        id: "desks",
        name: "Desks & Workstations",
        categoryId: "office",
        images: generateImageSet(2),
        description: "Functional desks and workstations for productive workspaces.",
        totalProducts: 6
      },
      {
        id: "filing-cabinets",
        name: "Filing Cabinets",
        categoryId: "office",
        images: generateImageSet(3),
        description: "Organized storage solutions for documents and office supplies.",
        totalProducts: 4
      }
    ]
  },
  {
    id: "outdoor",
    name: "Outdoor",
    image: AVAILABLE_IMAGES[4],
    description: "Durable and stylish outdoor furniture to create perfect spaces for relaxation and entertainment.",
    totalProducts: 12,
    subCategories: [
      {
        id: "patio-sets",
        name: "Patio Sets",
        categoryId: "outdoor",
        images: generateImageSet(4),
        description: "Complete outdoor seating sets for patio and garden.",
        totalProducts: 5
      },
      {
        id: "garden-chairs",
        name: "Garden Chairs",
        categoryId: "outdoor",
        images: generateImageSet(5),
        description: "Comfortable individual chairs for garden and outdoor spaces.",
        totalProducts: 4
      },
      {
        id: "outdoor-tables",
        name: "Outdoor Tables",
        categoryId: "outdoor",
        images: generateImageSet(6),
        description: "Weather-resistant tables for outdoor dining and entertaining.",
        totalProducts: 3
      }
    ]
  }
];

// ==================== PRODUCTS DATA ====================
export const products: Product[] = [
  // ========== LIVING ROOM PRODUCTS ==========
  {
    id: 1,
    name: "Modern Sofa Set",
    price: 1299.99,
    originalPrice: 1599.99,
    category: "living",
    subCategory: "sofas",
    image: AVAILABLE_IMAGES[0],
    images: [
      AVAILABLE_IMAGES[0],
      AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3],
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestSeller: true,
    description: "Contemporary 3-seater sofa with premium fabric and wooden legs. Designed for ultimate comfort and style.",
    features: [
      "Premium fabric upholstery",
      "Solid wood frame construction",
      "High-density foam cushions",
      "Easy to clean and maintain",
      "Stain-resistant material",
      "Modular design options"
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
    tags: ["new arrival", "best seller", "premium"]
  },
  {
    id: 2,
    name: "Leather Recliner Sofa",
    price: 899.99,
    originalPrice: 1199.99,
    category: "living",
    subCategory: "sofas",
    image: AVAILABLE_IMAGES[1],
    images: [
      AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4],
    ],
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isBestSeller: false,
    description: "Premium leather recliner sofa with massage function and USB charging ports.",
    features: [
      "Genuine leather upholstery",
      "Built-in massage system",
      "USB charging ports",
      "Adjustable reclining positions",
      "Padded armrests"
    ],
    dimensions: "38'' W x 42'' D x 40'' H",
    material: "Genuine Leather, Metal Frame, Foam",
    warranty: "3 years warranty",
    inStock: true,
    stockQuantity: 8,
    color: ["Brown", "Black", "Cognac"],
    brand: "Comfort Plus",
    tags: ["recliner", "massage", "premium"]
  },
  {
    id: 3,
    name: "Premium Coffee Table",
    price: 399.99,
    originalPrice: 499.99,
    category: "living",
    subCategory: "coffee-tables",
    image: AVAILABLE_IMAGES[5],
    images: [
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8],
    ],
    rating: 4.4,
    reviews: 78,
    isNew: false,
    isBestSeller: false,
    description: "Nested coffee tables with tempered glass top and modern metal frame.",
    features: [
      "Tempered safety glass top",
      "Powder-coated metal frame",
      "Nested space-saving design",
      "Easy to move and clean",
      "Scratch-resistant surface"
    ],
    dimensions: "Large: 24'' H x 24'' W, Small: 18'' H x 18'' W",
    material: "Tempered Glass, Powder-coated Metal",
    warranty: "1 year warranty",
    inStock: true,
    stockQuantity: 12,
    color: ["Chrome", "Matte Black", "Bronze"],
    brand: "Modern Living",
    tags: ["modern", "glass top", "nested"]
  },
//   {
//     id: 4,
//     name: "TV Entertainment Unit",
//     price: 599.99,
//     originalPrice: 749.99,
//     category: "living",
//     subCategory: "tv-units",
//     image: AVAILABLE_IMAGES[2],
//     images: [
//       AVAILABLE_IMAGES[2],
//       AVAILABLE_IMAGES[3],
//       AVAILABLE_IMAGES[4],
//       AVAILABLE_IMAGES[5],
//     ],
//     rating: 4.5,
//     reviews: 56,
//     isNew: true,
//     isBestSeller: true,
//     description: "Modern TV unit with cable management and LED lighting.",
//     features: [
//       "Cable management system",
//       "Adjustable shelves",
//       "LED ambient lighting",
//       "Glass doors",
//       "Media console space"
//     ],
//     dimensions: "60'' W x 18'' D x 24'' H",
//     material: "Engineered Wood, Glass, Metal",
//     warranty: "2 years warranty",
//     inStock: true,
//     stockQuantity: 10,
//     color: ["White", "Walnut", "Black"],
//     brand: "MediaTech",
//     tags: ["tv unit", "entertainment", "led lighting"]
//   },
  {
    id: 5,
    name: "Wooden Bookshelf",
    price: 299.99,
    originalPrice: 399.99,
    category: "living",
    subCategory: "bookshelves",
    image: AVAILABLE_IMAGES[6],
    images: [
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8],
      AVAILABLE_IMAGES[0],
    ],
    rating: 4.6,
    reviews: 92,
    isNew: false,
    isBestSeller: true,
    description: "5-tier wooden bookshelf with adjustable shelves.",
    features: [
      "5 adjustable shelves",
      "Solid wood construction",
      "Wall mounting kit included",
      "Open and closed storage",
      "Easy assembly"
    ],
    dimensions: "30'' W x 12'' D x 72'' H",
    material: "Solid Wood, MDF",
    warranty: "2 years warranty",
    inStock: true,
    stockQuantity: 18,
    color: ["Oak", "Walnut", "White"],
    brand: "Home Library",
    tags: ["bookshelf", "storage", "adjustable"]
  },

  // ========== BEDROOM PRODUCTS ==========
  {
    id: 6,
    name: "Luxury King Bed Frame",
    price: 1899.99,
    originalPrice: 2299.99,
    category: "bedroom",
    subCategory: "beds",
    image: AVAILABLE_IMAGES[5],
    images: [
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8],
    ],
    rating: 4.9,
    reviews: 156,
    isNew: true,
    isBestSeller: false,
    description: "Upholstered king size bed with built-in storage and premium tufted headboard.",
    features: [
      "Built-in storage drawers",
      "Premium tufted headboard",
      "Solid wood frame construction",
      "Easy under-bed cleaning access",
      "Noise-free assembly"
    ],
    dimensions: "84'' W x 86'' D x 48'' H",
    material: "Premium Fabric, Solid Wood, Metal Drawers",
    warranty: "5 years comprehensive warranty",
    inStock: true,
    stockQuantity: 6,
    color: ["Charcoal Gray", "Navy Blue", "Cream White"],
    brand: "Royal Comfort",
    tags: ["king bed", "storage", "luxury"]
  },
  {
    id: 7,
    name: "Walk-in Wardrobe",
    price: 2499.99,
    originalPrice: 2999.99,
    category: "bedroom",
    subCategory: "wardrobes",
    image: AVAILABLE_IMAGES[3],
    images: [
      AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
    ],
    rating: 4.8,
    reviews: 45,
    isNew: true,
    isBestSeller: true,
    description: "Customizable walk-in wardrobe system with mirrored doors.",
    features: [
      "Customizable layout",
      "Soft-close drawers",
      "Mirrored sliding doors",
      "Multiple hanging spaces",
      "Shoe racks included"
    ],
    dimensions: "96'' W x 24'' D x 84'' H",
    material: "MDF, Glass, Metal",
    warranty: "5 years warranty",
    inStock: true,
    stockQuantity: 3,
    color: ["White Gloss", "Gray Matt", "Walnut"],
    brand: "Storage Solutions",
    tags: ["wardrobe", "customizable", "mirrored"]
  },
  {
    id: 8,
    name: "Modern Dresser",
    price: 699.99,
    category: "bedroom",
    subCategory: "dressers",
    image: AVAILABLE_IMAGES[4],
    images: [
      AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
    ],
    rating: 4.4,
    reviews: 78,
    isNew: false,
    isBestSeller: false,
    description: "9-drawer dresser with included mirror.",
    features: [
      "9 spacious drawers",
      "Included mirror",
      "Soft-close mechanism",
      "Ample storage space",
      "Modern design"
    ],
    dimensions: "64'' W x 18'' D x 32'' H",
    material: "Solid Wood, MDF",
    warranty: "2 years warranty",
    inStock: true,
    stockQuantity: 8,
    color: ["White", "Espresso", "Gray"],
    brand: "Bedroom Elegance",
    tags: ["dresser", "storage", "mirror"]
  },
//   {
//     id: 9,
//     name: "Bedside Nightstand",
//     price: 149.99,
//     originalPrice: 199.99,
//     category: "bedroom",
//     subCategory: "nightstands",
//     image: AVAILABLE_IMAGES[7],
//     images: [
//       AVAILABLE_IMAGES[7],
//       AVAILABLE_IMAGES[8],
//       AVAILABLE_IMAGES[0],
//       AVAILABLE_IMAGES[1],
//     ],
//     rating: 4.3,
//     reviews: 112,
//     isNew: true,
//     isBestSeller: true,
//     description: "Modern bedside table with drawer and shelf.",
//     features: [
//       "One drawer storage",
//       "Open shelf below",
//       "Compact design",
//       "Easy assembly",
//       "Modern look"
//     ],
//     dimensions: "18'' W x 14'' D x 24'' H",
//     material: "Wood, Metal",
//     warranty: "1 year warranty",
//     inStock: true,
//     stockQuantity: 25,
//     color: ["Black", "White", "Walnut"],
//     brand: "Bedside Comfort",
//     tags: ["nightstand", "bedside", "compact"]
//   },

  // ========== DINING ROOM PRODUCTS ==========
  {
    id: 10,
    name: "Scandinavian Dining Table",
    price: 899.99,
    originalPrice: 1099.99,
    category: "dining",
    subCategory: "dining-tables",
    image: AVAILABLE_IMAGES[1],
    images: [
      AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4],
    ],
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isBestSeller: true,
    description: "Minimalist oak dining table with clean lines and natural finish.",
    features: [
      "Solid oak wood construction",
      "Water-resistant natural finish",
      "Easy 30-minute assembly",
      "Scandinavian minimalist design",
      "Sturdy and durable"
    ],
    dimensions: "72'' L x 36'' W x 30'' H",
    material: "Solid Oak Wood, Metal Hardware",
    warranty: "3 years structural warranty",
    inStock: true,
    stockQuantity: 8,
    color: ["Natural Oak", "Walnut Finish", "White Wash"],
    brand: "Nordic Design",
    tags: ["dining table", "scandinavian", "oak"]
  },
  {
    id: 11,
    name: "Dining Chair Set",
    price: 399.99,
    category: "dining",
    subCategory: "dining-chairs",
    image: AVAILABLE_IMAGES[5],
    images: [
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8],
    ],
    rating: 4.6,
    reviews: 102,
    isNew: true,
    isBestSeller: true,
    description: "Set of 4 modern dining chairs with ergonomic design.",
    features: [
      "Ergonomic design",
      "Waterproof fabric",
      "Easy to clean",
      "Sturdy construction",
      "Comfortable seating"
    ],
    dimensions: "19'' W x 21'' D x 34'' H",
    material: "Wood, Fabric, Metal",
    warranty: "1 year warranty",
    inStock: true,
    stockQuantity: 15,
    color: ["Gray", "Beige", "Navy", "Black"],
    brand: "Seat Comfort",
    tags: ["dining chairs", "set of 4", "ergonomic"]
  },
  {
    id: 12,
    name: "Buffet Sideboard",
    price: 799.99,
    originalPrice: 999.99,
    category: "dining",
    subCategory: "buffets",
    image: AVAILABLE_IMAGES[6],
    images: [
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
      AVAILABLE_IMAGES[8],
      AVAILABLE_IMAGES[0],
    ],
    rating: 4.7,
    reviews: 63,
    isNew: false,
    isBestSeller: false,
    description: "Storage sideboard for dining room with glass display cabinet.",
    features: [
      "Glass display cabinet",
      "4 drawers",
      "2 cabinets",
      "Soft-close hinges",
      "Ample storage"
    ],
    dimensions: "55'' W x 16'' D x 34'' H",
    material: "Solid Wood, Glass",
    warranty: "3 years warranty",
    inStock: true,
    stockQuantity: 6,
    color: ["Oak", "Walnut", "White"],
    brand: "Dining Storage",
    tags: ["sideboard", "buffet", "storage"]
  },

  // ========== OFFICE PRODUCTS ==========
  {
    id: 13,
    name: "Executive Office Chair",
    price: 499.99,
    originalPrice: 649.99,
    category: "office",
    subCategory: "office-chairs",
    image: AVAILABLE_IMAGES[3],
    images: [
      AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
    ],
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isBestSeller: true,
    description: "Ergonomic office chair with advanced lumbar support and adjustable features.",
    features: [
      "Advanced lumbar support system",
      "Adjustable height and armrests",
      "360-degree swivel base",
      "Breathable mesh backrest",
      "Synchronized tilt mechanism"
    ],
    dimensions: "26'' W x 26'' D x 45'' H",
    material: "Premium Mesh, Aluminum Base, PU Leather",
    warranty: "5 years warranty",
    inStock: true,
    stockQuantity: 20,
    color: ["Black Mesh", "Gray Mesh", "Brown Leather"],
    brand: "ErgoPro",
    tags: ["office chair", "ergonomic", "executive"]
  },
//   {
//     id: 14,
//     name: "Standing Desk",
//     price: 449.99,
//     category: "office",
//     subCategory: "desks",
//     image: AVAILABLE_IMAGES[7],
//     images: [
//       AVAILABLE_IMAGES[7],
//       AVAILABLE_IMAGES[8],
//       AVAILABLE_IMAGES[0],
//       AVAILABLE_IMAGES[1],
//     ],
//     rating: 4.8,
//     reviews: 187,
//     isNew: true,
//     isBestSeller: true,
//     description: "Electric height-adjustable standing desk with memory presets.",
//     features: [
//       "Electric adjustment",
//       "Memory presets",
//       "Cable management",
//       "Spacious work surface",
//       "Sturdy construction"
//     ],
//     dimensions: "55'' W x 28'' D x 29''-48'' H",
//     material: "Steel, Engineered Wood",
//     warranty: "5 years warranty",
//     inStock: true,
//     stockQuantity: 12,
//     color: ["White", "Black", "Walnut"],
//     brand: "WorkSmart",
//     tags: ["standing desk", "adjustable", "electric"]
//   },
//   {
//     id: 15,
//     name: "File Cabinet",
//     price: 199.99,
//     category: "office",
//     subCategory: "filing-cabinets",
//     image: AVAILABLE_IMAGES[8],
//     images: [
//       AVAILABLE_IMAGES[8],
//       AVAILABLE_IMAGES[0],
//       AVAILABLE_IMAGES[1],
//       AVAILABLE_IMAGES[2],
//     ],
//     rating: 4.3,
//     reviews: 89,
//     isNew: false,
//     isBestSeller: false,
//     description: "2-drawer letter size filing cabinet with lock.",
//     features: [
//       "Fire-resistant",
//       "Lockable drawers",
//       "Smooth gliding",
//       "Letter size filing",
//       "Durable construction"
//     ],
//     dimensions: "15'' W x 25'' D x 28'' H",
//     material: "Steel",
//     warranty: "10 years warranty",
//     inStock: true,
//     stockQuantity: 20,
//     color: ["Black", "Gray", "Beige"],
//     brand: "Office Storage",
//     tags: ["file cabinet", "storage", "fire-resistant"]
//   },

  // ========== OUTDOOR PRODUCTS ==========
  {
    id: 16,
    name: "Outdoor Lounge Set",
    price: 1599.99,
    originalPrice: 1999.99,
    category: "outdoor",
    subCategory: "patio-sets",
    image: AVAILABLE_IMAGES[4],
    images: [
      AVAILABLE_IMAGES[4],
      AVAILABLE_IMAGES[5],
      AVAILABLE_IMAGES[6],
      AVAILABLE_IMAGES[7],
    ],
    rating: 4.5,
    reviews: 67,
    isNew: true,
    isBestSeller: false,
    description: "Weather-resistant rattan furniture set with comfortable cushions.",
    features: [
      "All-weather rattan construction",
      "UV-protected cushions",
      "Water-resistant fabric",
      "Modular design flexibility",
      "Rust-resistant aluminum frame"
    ],
    dimensions: "Sofa: 35'' H x 60'' W, Chair: 32'' H x 28'' W",
    material: "Synthetic Rattan, Aluminum, Outdoor Fabric",
    warranty: "2 years weather warranty",
    inStock: true,
    stockQuantity: 4,
    color: ["Dark Brown", "Light Gray", "Espresso"],
    brand: "Garden Living",
    tags: ["patio set", "outdoor", "weather-resistant"]
  },
  {
    id: 17,
    name: "Garden Lounge Chair",
    price: 249.99,
    category: "outdoor",
    subCategory: "garden-chairs",
    image: AVAILABLE_IMAGES[0],
    images: [
      AVAILABLE_IMAGES[0],
      AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3],
    ],
    rating: 4.5,
    reviews: 124,
    isNew: false,
    isBestSeller: true,
    description: "Comfortable adjustable garden lounge chair.",
    features: [
      "Adjustable backrest",
      "Weather-resistant",
      "Foldable design",
      "Comfortable seating",
      "Easy to store"
    ],
    dimensions: "24'' W x 60'' D x 36'' H",
    material: "Aluminum, Textilene",
    warranty: "2 years warranty",
    inStock: true,
    stockQuantity: 18,
    color: ["Brown", "Gray", "Green", "Beige"],
    brand: "Outdoor Comfort",
    tags: ["garden chair", "adjustable", "foldable"]
  },
  {
    id: 18,
    name: "Outdoor Dining Table",
    price: 549.99,
    category: "outdoor",
    subCategory: "outdoor-tables",
    image: AVAILABLE_IMAGES[1],
    images: [
      AVAILABLE_IMAGES[1],
      AVAILABLE_IMAGES[2],
      AVAILABLE_IMAGES[3],
      AVAILABLE_IMAGES[4],
    ],
    rating: 4.6,
    reviews: 91,
    isNew: true,
    isBestSeller: false,
    description: "Weatherproof outdoor dining table with tempered glass top.",
    features: [
      "UV resistant finish",
      "Easy to clean",
      "Rust-proof aluminum",
      "Tempered glass top",
      "Sturdy construction"
    ],
    dimensions: "63'' L x 35'' W x 30'' H",
    material: "Aluminum, Tempered Glass",
    warranty: "3 years warranty",
    inStock: true,
    stockQuantity: 9,
    color: ["Black", "Bronze", "White"],
    brand: "Patio Living",
    tags: ["outdoor table", "dining", "weatherproof"]
  }
];

// ==================== HELPER FUNCTIONS ====================
export const allProducts = products;

export const getAllCategories = () => categories;

export const getAllSubCategories = (): SubCategory[] => {
  return categories.flatMap(cat => cat.subCategories);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getSubCategoryById = (id: string): SubCategory | undefined => {
  for (const category of categories) {
    const subCat = category.subCategories.find(sub => sub.id === id);
    if (subCat) return subCat;
  }
  return undefined;
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsBySubCategory = (subCategoryId: string): Product[] => {
  return products.filter(product => product.subCategory === subCategoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isBestSeller || product.isNew);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

// ==================== DATA SUMMARY ====================
export const getDataSummary = () => {
  const summary = {
    totalCategories: categories.length,
    totalSubCategories: getAllSubCategories().length,
    totalProducts: products.length,
    categories: categories.map(cat => ({
      name: cat.name,
      subCategories: cat.subCategories.length,
      products: getProductsByCategory(cat.id).length
    }))
  };
  
  return summary;
};

// Example usage of summary
console.log("=== DATA SUMMARY ===");
console.log(getDataSummary());