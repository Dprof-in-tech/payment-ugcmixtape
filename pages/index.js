import React, { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [couponCode, setCouponCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Extract values from URL parameters (handle missing values gracefully)
    const name = urlParams.get('n') || '';
    const email = urlParams.get('e') || '';
    const id = urlParams.get('i') || '';
    const client = urlParams.get('cn') || '';
    let amount = parseFloat(urlParams.get('p')) || 0;

    if (amount == 29){
      setShowCheckout(true)
    }

    if (couponCode === 'SOSHE2024' && amount != 29) {
      amount -= Math.ceil(amount * 0.3324);
    }

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, amount, id, client, couponCode }),
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
  }, [couponCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCheckout(true);
  };

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {!showCheckout ? (
        <div className='flex flex-col items-center justify-center mt-20 w-full h-full'>
        <div className='flex flex-col w-[85%] md:w-[30%] h-[65vh] items-center justify-center border border-gray-200 rounded-md'>
          <div className='w-[100px] h-[100px]'>
            <img src='/ugcmixtape.svg' alt='logo' className='w-full h-full' />
          </div>
          <form onSubmit={handleSubmit} className=''>
              <label
                htmlFor="coupon"
                className="flex flex-col overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <span className="text-xs font-medium text-gray-700 mb-4"> Coupon code </span>

                <input
                  type="text"
                  name='coupon'
                  placeholder="GHJ78J"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="mt-4 w-full border border-gray-200 p-4 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                />
                <p className='mt-1 -ml-4 self-start text-[13px]'>
                  Optional
                </p>
              </label>
            <button type="submit" className='text-white mt-4 px-6 py-3  w-full bg-custom-gradient border border-gray-300 focus:border-gray-400 hover:border-gray-600 rounded-3xl'>Pay</button>
          </form>

          <div className='mt-4 ml-8 w-[75%]'>
            <p>
              Please if you do not have a coupon code, just click on the pay button
            </p>
          </div>
        </div>
        </div>
      ) : (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}

    </div>
  );
}
