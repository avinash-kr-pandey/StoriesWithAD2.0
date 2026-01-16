// utils/projectsData.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  date: string;
  materials: string[];
  dimensions: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Ergonomic Office Chair",
    description:
      "A premium ergonomic office chair designed for all-day comfort and productivity.",
    detailedDescription:
      "This ergonomic office chair was designed with focus on posture support and comfort for long working hours. Features include adjustable lumbar support, breathable mesh back, 4D armrests, and a 165-degree recline function. The chair is certified for both home and office use with a 10-year warranty on the frame.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Ergonomic", "Office", "Mesh", "Adjustable"],
    githubLink: "https://github.com",
    liveLink: "https://ergonomic-chair.example.com",
    date: "Mar 2024",
    materials: [
      "Aluminum Frame",
      "Breathable Mesh",
      "Memory Foam",
      "PU Leather",
    ],
    dimensions: "27.5″ W x 27″ D x 45-52″ H",
    category: "Office Furniture",
  },
  {
    id: 2,
    title: "Modern Wooden Dining Set",
    description:
      "A minimalist dining table with matching chairs crafted from sustainable oak.",
    detailedDescription:
      "This dining set combines modern aesthetics with traditional woodworking. The table features solid oak construction with hairpin legs, while the chairs use a mix of oak and walnut for contrast. The set is designed for easy assembly and includes protective coating for durability against daily use.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Wood", "Dining", "Minimalist", "Sustainable"],
    githubLink: "https://github.com",
    liveLink: "https://dining-set.example.com",
    date: "Feb 2024",
    materials: [
      "Solid Oak",
      "Walnut Accents",
      "Steel Hardware",
      "Food-safe Finish",
    ],
    dimensions: "Table: 72″ x 36″ x 30″ H | Chair: 18″ W x 22″ D x 32″ H",
    category: "Dining Furniture",
  },
  {
    id: 3,
    title: "Compact Convertible Sofa",
    description:
      "Space-saving sofa that converts into a comfortable bed for studio apartments.",
    detailedDescription:
      "Designed for modern urban living, this convertible sofa maximizes small spaces without compromising comfort. Features include a quick-pull mechanism for bed conversion, removable/washable covers, and built-in storage for bedding. The frame uses reinforced steel for durability while maintaining a sleek profile.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Convertible", "Space-saving", "Modern", "Multifunctional"],
    githubLink: "https://github.com",
    liveLink: "https://convertible-sofa.example.com",
    date: "Jan 2024",
    materials: [
      "Reinforced Steel",
      "High-density Foam",
      "Linen Blend Fabric",
      "Plywood",
    ],
    dimensions: "72″ W x 35″ D x 32″ H (Sofa) | 72″ W x 54″ D (Bed)",
    category: "Living Room",
  },
  {
    id: 4,
    title: "Children's Study Desk",
    description:
      "Adjustable height desk with storage designed for growing children.",
    detailedDescription:
      "This ergonomic study desk grows with your child, featuring height adjustment from 24″ to 32″. Includes built-in cable management, book storage, and an anti-tip mechanism. The rounded corners and non-toxic finishes ensure safety, while the colorful options appeal to children.",
    image:
      "https://images.unsplash.com/photo-1512389055482-56c2139d96c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Children", "Adjustable", "Study", "Safe"],
    githubLink: "https://github.com",
    liveLink: "https://kids-desk.example.com",
    date: "Dec 2023",
    materials: [
      "Birch Plywood",
      "ABS Plastic",
      "Steel Mechanism",
      "Water-based Paint",
    ],
    dimensions: "40″ W x 24″ D x 24-32″ H",
    category: "Children's Furniture",
  },
  {
    id: 5,
    title: "Outdoor Patio Set",
    description: "Weather-resistant aluminum and teak outdoor furniture set.",
    detailedDescription:
      "Designed for year-round outdoor use, this patio set combines durable aluminum frame with sustainably sourced teak wood. Features include UV-resistant cushions, powder-coated aluminum that won't rust, and stackable chairs for easy storage. The set withstands various weather conditions while maintaining elegance.",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Outdoor", "Weather-resistant", "Teak", "Aluminum"],
    githubLink: "https://github.com",
    liveLink: "https://patio-set.example.com",
    date: "Nov 2023",
    materials: [
      "Powder-coated Aluminum",
      "Teak Wood",
      "Sunbrella Fabric",
      "Stainless Hardware",
    ],
    dimensions: "Table: 60″ Dia x 30″ H | Chair: 22″ W x 26″ D x 34″ H",
    category: "Outdoor Furniture",
  },
  {
    id: 6,
    title: "Minimalist Bookshelf",
    description:
      "Floating shelf system with modular components for customizable storage.",
    detailedDescription:
      "This modular bookshelf system uses a unique bracket-free design for a floating appearance. Components can be arranged in multiple configurations to suit different spaces and storage needs. Made from sustainable bamboo with reinforced steel supports, it combines strength with minimalist aesthetics.",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Modular", "Bookshelf", "Minimalist", "Bamboo"],
    githubLink: "https://github.com",
    liveLink: "https://bookshelf.example.com",
    date: "Oct 2023",
    materials: ["Bamboo", "Steel Supports", "Hidden Hardware", "Clear Coat"],
    dimensions: "Modular: 12″/24″/36″ W x 12″ D x 72″ H max",
    category: "Storage",
  },
];
