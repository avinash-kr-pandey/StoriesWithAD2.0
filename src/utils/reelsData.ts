export interface Reel {
  id: number;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  productLink: string;
}

// Use optimized video formats if possible
export const reelsData: Reel[] = [
  {
    id: 1,
    videoUrl: "/video/reels/reels1.mp4",
    thumbnail: "/PICTURES/_DEV0809.jpg",
    title: "Fantasma Floor Lamp",
    description: "Minimalist lighting for modern spaces",
    productLink: "/products/fantasma-lamp",
  },
  {
    id: 2,
    videoUrl: "/video/reels/reels1.mp4",
    thumbnail: "/PICTURES/_DEV0830.jpg",
    title: "Ceramic Black Footed Bowl",
    description: "Handcrafted ceramic home decor piece",
    productLink: "/products/ceramic-bowl",
  },
  {
    id: 3,
    videoUrl: "/video/reels/reels1.mp4",
    thumbnail: "/PICTURES/_DEV0836.jpg",
    title: "Black Velvet Armchairs",
    description: "Luxury comfort with contemporary design",
    productLink: "/products/velvet-armchairs",
  },
  {
    id: 4,
    videoUrl: "/video/reels/reels1.mp4",
    thumbnail: "/PICTURES/_DEV0842.jpg",
    title: "Abstract Art Collection",
    description: "Original artworks for your walls",
    productLink: "/products/abstract-art",
  },
];