
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import { useAuth } from "../contexts/AuthContext";
import { useStore } from "../contexts/StoreContext";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import { toast } from "sonner";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const { cart, total, clearCart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    // Load user data and create payment intent
    loadUserData();
    createPaymentIntent();
  }, [currentUser, cart]);

  const loadUserData = async () => {
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', currentUser.uid)
        .single();

      if (data) {
        setShippingAddress(prev => ({
          ...prev,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: currentUser.email || "",
          phone: data.phone || "",
        }));
      } else {
        const displayName = currentUser.displayName || "";
        const nameParts = displayName.split(" ");
        setShippingAddress(prev => ({
          ...prev,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: currentUser.email || "",
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
        }),
      });

      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-4">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            {clientSecret && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-4">
                  Payment Information
                </h2>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm 
                    clientSecret={clientSecret}
                    shippingAddress={shippingAddress}
                    onSuccess={() => {
                      clearCart();
                      navigate("/account");
                      toast.success("Order placed successfully!");
                    }}
                  />
                </Elements>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h2 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-dm-sans font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="font-dm-sans text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="font-dm-sans font-bold text-brand-sage">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between font-dm-sans">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-dm-sans">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-dm-sans">
                <span>Tax:</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-anonymous text-lg font-bold text-brand-dark-brown border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
