"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#eae1d1] flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 shadow-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped within 3-5 business days.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            What&rsquo;s Next?
          </h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• You&rsquo;ll receive an email confirmation shortly</li>
            <li>• Your furniture will be delivered within 5-7 business days</li>
            <li>• Professional assembly service included</li>
            <li>• Track your order with the link in your email</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
