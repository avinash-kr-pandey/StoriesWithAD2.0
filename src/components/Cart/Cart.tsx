"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Calculate cart totals
  const subtotal = cart.total;
  const shipping = subtotal > 2000 ? 0 : 99.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle checkout process
  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  // Handle clear entire cart
  const handleClearCart = () => {
    if (cart.items.length === 0) {
      alert("Cart is already empty!");
      return;
    }
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    router.push("/shop");
  };

  return (
    <div className="min-h-screen bg-[#eae1d1] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>›</li>
            <li>
              <Link href="/shop" className="hover:text-gray-900">
                Shop
              </Link>
            </li>
            <li>›</li>
            <li className="text-gray-900">Shopping Cart</li>
          </ol>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          {/* Cart Actions */}
          {cart.items.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={handleContinueShopping}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-16 rounded-xl shadow-sm border border-gray-200 bg-white">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              🛋️
            </div>
            <p className="text-gray-500 text-lg mb-4">
              Your furniture cart is empty
            </p>
            <button
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              Browse Furniture
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center hover:shadow-md transition-shadow"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                    width={96}
                    height={96}
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full mb-2">
                      {item.product.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="mx-2 font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-0 sm:ml-6 text-left sm:text-right mt-4 sm:mt-0">
                    <p className="font-semibold text-gray-900 text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 text-sm mt-1 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cart.itemCount})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>
                      {shipping === 0
                        ? "Free Delivery"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-4 rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg mb-4"
                >
                  Proceed to Checkout (${total.toFixed(2)})
                </button>

                {subtotal < 2000 && (
                  <p className="text-center text-sm text-amber-600 mt-4">
                    Add ${(2000 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    🛋️ Furniture Care
                  </h4>
                  <p className="text-xs text-gray-600">
                    All furniture comes with warranty and free assembly service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products Suggestion */}
        {cart.items.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Throw Pillows",
                  price: 49.99,
                  image: "/PICTURES/_DEV0791.jpg",
                  category: "Accessories",
                },
                {
                  name: "Area Rug",
                  price: 199.99,
                  image: "/PICTURES/_DEV0803.jpg",
                  category: "Decor",
                },
                {
                  name: "Table Lamp",
                  price: 89.99,
                  image: "/PICTURES/_DEV0809.jpg",
                  category: "Lighting",
                },
                {
                  name: "Wall Art",
                  price: 129.99,
                  image: "/PICTURES/_DEV0830.jpg",
                  category: "Art",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-full h-32 mb-3 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.category}
                  </span>
                  <h4 className="font-semibold text-sm mt-1">{product.name}</h4>
                  <p className="text-amber-600 font-semibold">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
