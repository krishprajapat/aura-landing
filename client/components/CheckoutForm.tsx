
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
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

interface CheckoutFormProps {
  clientSecret: string;
  shippingAddress: ShippingAddress;
  onSuccess: () => void;
}

export default function CheckoutForm({ clientSecret, shippingAddress, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed");
      } else {
        // Save order to database
        await saveOrder();
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    }

    setIsLoading(false);
  };

  const saveOrder = async () => {
    if (!currentUser) return;

    try {
      // Save shipping address
      await supabase
        .from('user_addresses')
        .upsert({
          user_id: currentUser.uid,
          type: 'shipping',
          first_name: shippingAddress.firstName,
          last_name: shippingAddress.lastName,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zip_code: shippingAddress.zipCode,
          country: shippingAddress.country,
          is_default: true,
        });

      // Save order (you'll need to implement this based on your cart structure)
      const orderData = {
        user_id: currentUser.uid,
        status: 'processing',
        total: 0, // Calculate from cart
        items: 0, // Calculate from cart
        shipping_address: shippingAddress,
        created_at: new Date().toISOString(),
      };

      await supabase
        .from('orders')
        .insert([orderData]);

    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="w-full mt-6 py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Complete Order"}
      </button>
    </form>
  );
}
