"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // Calculate totals
  const subtotal = cart.total;
  const shipping = subtotal > 2000 ? 0 : 99.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In real app, integrate with payment gateway like Stripe, Razorpay, etc.
      alert("Payment processed successfully! Order confirmed.");
      clearCart();
      setIsProcessing(false);
      router.push("/order-confirmation");
    }, 2000);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-42 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Shipping & Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 mt-4"
                  required
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Payment Information
                </h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                  required
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on Card"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 mt-4"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-amber-600 text-white py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
