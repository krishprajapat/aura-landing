
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStore } from "../contexts/StoreContext";

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, addToWishlist, total, cartItemsCount } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "vecteur10") {
      setAppliedPromo({ code: promoCode, discount: 0.1 });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = total;
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const finalTotal = subtotal - discount + shipping + tax;

  const moveToWishlist = async (cartItemId: string) => {
    const cartItem = cart.find(item => item.id === cartItemId);
    if (cartItem && cartItem.product) {
      await addToWishlist(cartItem.product);
      await removeFromCart(cartItemId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5"
              />
            </svg>
            <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-4">
              Your Cart is Empty
            </h1>
            <p className="font-dm-sans text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
              Looks like you haven't added anything to your cart yet. Start
              exploring our collection to find your perfect pieces.
            </p>
            <Link
              to="/products"
              className="inline-flex px-8 py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-2">
              Shopping Cart
            </h1>
            <p className="font-dm-sans text-gray-600">
              {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-dm-sans text-sm transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product?.image_url || '/placeholder.svg'}
                        alt={item.product?.name || 'Product'}
                        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-anonymous text-lg md:text-xl font-bold text-brand-dark-brown mb-2">
                            {item.product?.name || 'Product'}
                          </h3>
                          <div className="space-y-1 text-sm font-dm-sans text-gray-600">
                            {item.size && <p>Size: {item.size}</p>}
                            {item.color && <p>Color: {item.color}</p>}
                            {item.product && !item.product.in_stock && (
                              <p className="text-red-600 font-medium">
                                Out of Stock
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-dm-sans text-lg font-bold text-brand-sage">
                              ${item.product?.price || 0}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <label className="font-dm-sans text-sm text-gray-700">
                              Quantity:
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                disabled={!item.product?.in_stock}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-gray-300 font-dm-sans">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                disabled={!item.product?.in_stock}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="flex items-center gap-1 px-3 py-1 text-xs font-dm-sans text-brand-sage hover:text-brand-green transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              Save for Later
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1 px-3 py-1 text-xs font-dm-sans text-red-600 hover:text-red-800 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-green font-dm-sans transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-warm-beige rounded-lg p-6 sticky top-4">
              <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans text-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-green transition-colors font-dm-sans text-sm"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-green-600 font-dm-sans">
                      {appliedPromo.code} applied
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 font-dm-sans">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-brand-sage">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Banner */}
              {shipping > 0 && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-dm-sans text-blue-800">
                    Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                className="w-full py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors mb-4"
                disabled={cart.some((item) => !item.product?.in_stock)}
              >
                {cart.some((item) => !item.product?.in_stock)
                  ? "Some items unavailable"
                  : "Proceed to Checkout"}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm font-dm-sans text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
