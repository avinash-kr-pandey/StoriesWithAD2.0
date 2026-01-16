export const images = {
  // Gallery Categories
  gallery: {
    seating: [
      "/PICTURES/_DEV0791.jpg",
      "/PICTURES/_DEV0803.jpg",
      "/PICTURES/_DEV0809.jpg",
      "/PICTURES/_DEV0830.jpg",
    ],
    tables: [
      "/PICTURES/_DEV0836.jpg",
      "/PICTURES/_DEV0842.jpg",
      "/PICTURES/_DEV0848.jpg",
      "/PICTURES/_DEV0854.jpg",
    ],
    art: [
      "/PICTURES/_DEV0866.jpg",
      "/PICTURES/_DEV0884.jpg",
      "/PICTURES/_DEV0914.jpg",
      "/PICTURES/_DEV0932.jpg",
    ],
    lighting: [
      "/PICTURES/_DEV0938.jpg",
      "/PICTURES/_DEV0953.jpg",
      "/PICTURES/_DEV0966.jpg",
      "/PICTURES/_DEV0972.jpg",
    ],
    bespoke: [
      "/PICTURES/_DEV1042.jpg",
      "/PICTURES/_DEV1063.jpg",
      "/PICTURES/_DEV1365.jpg",
      "/PICTURES/_DEV1371.jpg",
    ],
    objects: [
      "/PICTURES/_DEV1381.jpg",
      "/PICTURES/_DEV1394.jpg",
      "/PICTURES/_DEV1404.jpg",
      "/PICTURES/_DEV1413.jpg",
    ],
  },

  // Portfolio Categories
  portfolio: {
    webDesign: [
      "/PICTURES/_DEV1422.jpg",
      "/PICTURES/_DEV1436.jpg",
      "/PICTURES/_DEV1448.jpg",
      "/PICTURES/_DEV1454.jpg",
    ],
    photography: [
      "/PICTURES/_DEV1460.jpg",
      "/PICTURES/_DEV1463.jpg",
      "/PICTURES/_DEV1469.jpg",
      "/PICTURES/_DEV1472.jpg",
    ],
  },

  // Featured Images
  featured: {
    curated: "/PICTURES/CURATED.jpg",
    hero: "/PICTURES/_DEV1486.jpg",
    spotlight: [
      "/PICTURES/_DEV1493.jpg",
      "/PICTURES/_DEV1505.jpg",
      "/PICTURES/_DEV1511.jpg",
    ],
  },

  // Additional Images
  additional: [
    "/PICTURES/_DEV1524.jpg",
    "/PICTURES/_DEV1536.jpg",
    "/PICTURES/_DEV1539.jpg",
    "/PICTURES/_DEV1540.jpg",
    "/PICTURES/_DEV1541.jpg",
    "/PICTURES/_DEV1542.jpg",
    "/PICTURES/_DEV1543.jpg",
    "/PICTURES/_DEV1549.jpg",
    "/PICTURES/_DEV1549_1.jpg",
  ],

  // All images in one array for search or general use
  all: [
    "/PICTURES/_DEV0791.jpg",
    "/PICTURES/_DEV0803.jpg",
    "/PICTURES/_DEV0809.jpg",
    "/PICTURES/_DEV0830.jpg",
    "/PICTURES/_DEV0836.jpg",
    "/PICTURES/_DEV0842.jpg",
    "/PICTURES/_DEV0848.jpg",
    "/PICTURES/_DEV0854.jpg",
    "/PICTURES/_DEV0866.jpg",
    "/PICTURES/_DEV0884.jpg",
    "/PICTURES/_DEV0914.jpg",
    "/PICTURES/_DEV0932.jpg",
    "/PICTURES/_DEV0938.jpg",
    "/PICTURES/_DEV0953.jpg",
    "/PICTURES/_DEV0966.jpg",
    "/PICTURES/_DEV0972.jpg",
    "/PICTURES/_DEV1042.jpg",
    "/PICTURES/_DEV1063.jpg",
    "/PICTURES/_DEV1365.jpg",
    "/PICTURES/_DEV1371.jpg",
    "/PICTURES/_DEV1381.jpg",
    "/PICTURES/_DEV1394.jpg",
    "/PICTURES/_DEV1404.jpg",
    "/PICTURES/_DEV1413.jpg",
    "/PICTURES/_DEV1422.jpg",
    "/PICTURES/_DEV1436.jpg",
    "/PICTURES/_DEV1448.jpg",
    "/PICTURES/_DEV1454.jpg",
    "/PICTURES/_DEV1460.jpg",
    "/PICTURES/_DEV1463.jpg",
    "/PICTURES/_DEV1469.jpg",
    "/PICTURES/_DEV1472.jpg",
    "/PICTURES/_DEV1486.jpg",
    "/PICTURES/_DEV1493.jpg",
    "/PICTURES/_DEV1505.jpg",
    "/PICTURES/_DEV1511.jpg",
    "/PICTURES/_DEV1524.jpg",
    "/PICTURES/_DEV1536.jpg",
    "/PICTURES/_DEV1539.jpg",
    "/PICTURES/_DEV1540.jpg",
    "/PICTURES/_DEV1541.jpg",
    "/PICTURES/_DEV1542.jpg",
    "/PICTURES/_DEV1543.jpg",
    "/PICTURES/_DEV1549.jpg",
    "/PICTURES/_DEV1549_1.jpg",
    "/PICTURES/CURATED.jpg",
  ],
};

// Helper functions
export const getImagesByCategory = (category: string) => {
  return images.gallery[category as keyof typeof images.gallery] || [];
};

export const getPortfolioImages = (type: string) => {
  return images.portfolio[type as keyof typeof images.portfolio] || [];
};

export const getFeaturedImages = () => {
  return images.featured;
};

export default images;
