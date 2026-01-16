// app/products/[id]/page.tsx
import { allProducts } from "@/utils/products";
import ProductInfo from "../ProductInfo";
import ProductReviews from "../ProductReviews";
import RecommendedProducts from "../RecommendedProducts";

// ----------------------
// Type Definitions
// ----------------------
interface ProductParamsPromise {
  params: Promise<{
    id: string;
  }>;
}

// ----------------------
// Generate Static Paths
// ----------------------
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

// ----------------------
// Generate Metadata (SEO)
// ----------------------
export async function generateMetadata({ params }: ProductParamsPromise) {
  const { id } = await params; // Must await because params is a Promise

  const productId = parseInt(id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  return {
    title: `${product.name} - Furniture Store`,
    description: product.description,
  };
}

// ----------------------
// Product Page Component
// ----------------------
export default async function ProductDetail({ params }: ProductParamsPromise) {
  const { id } = await params;

  const productId = parseInt(id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p>Requested ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-32">
      <ProductInfo product={product} />
      <ProductReviews productId={productId} />
      <RecommendedProducts currentId={productId} category={product.category} />
    </div>
  );
}
