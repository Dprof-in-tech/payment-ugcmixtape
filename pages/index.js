import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const fetchClientSecret = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Extract values from URL parameters (handle missing values gracefully)
    const name = urlParams.get('n') || '';
    const email = urlParams.get('e') || '';
    const id = urlParams.get('i') || '';
    const amount = parseFloat(urlParams.get('p')) || 0; // Default to 0 if not provided

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, amount, id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error("No client secret found in the response");
      }

      return data.clientSecret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
