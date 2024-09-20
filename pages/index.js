import React, { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [couponCode, setCouponCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState(0); // Store the updated amount after coupon validation

  const validateCoupon = useCallback(async () => {
    if (couponCode.trim()) {
      const urlParams = new URLSearchParams(window.location.search);
      let amount = parseFloat(urlParams.get('p')) || 0;

      try {
        const couponValidationResponse = await fetch("/api/validate-coupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ couponCode, amount }),
        });

        if (!couponValidationResponse.ok) {
          const { message } = await couponValidationResponse.json();
          throw new Error(message);
        }

        const couponValidationData = await couponValidationResponse.json();
        if (couponValidationData.valid) {
          setAmount(couponValidationData.newAmount); // Set the new amount after applying the coupon
        } else {
          throw new Error(couponValidationData.message);
        }
      } catch (error) {
        console.error("Coupon validation error:", error);
        setErrorMessage(error.message || 'Invalid coupon');
        throw error;
      }
    } else {
      // No coupon provided, just use the original amount from the URL
      const urlParams = new URLSearchParams(window.location.search);
      setAmount(parseFloat(urlParams.get('p')) || 0); // Set amount from URL if no coupon is entered
    }
  }, [couponCode]);

  const fetchClientSecret = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('n') || '';
    const email = urlParams.get('e') || '';
    const id = urlParams.get('i') || '';
    const client = urlParams.get('cn') || '';

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setErrorMessage(error.message || 'An error occurred during checkout');
      throw error;
    }
  }, [amount, couponCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(''); // Clear previous error messages

    try {
      // Validate the coupon before fetching the client secret
      await validateCoupon();
      await fetchClientSecret();
      setShowCheckout(true);
    } catch (error) {
      console.log('Error during submission:', error.message);
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleSubmit}>
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
                <p className='mt-1 -ml-4 self-start text-[13px]'>Optional</p>
              </label>
              {errorMessage && <p className='text-red-900 text-[0.8rem] font-serif h-4 mb-4'>{errorMessage}</p>}
              <button
                type="submit"
                className='text-white mt-2 px-6 py-3 w-full bg-custom-gradient border border-gray-300 focus:border-gray-400 hover:border-gray-600 rounded-3xl'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Pay'}
              </button>
            </form>
            <div className='mt-2 ml-8 w-[75%]'>
              <p>Please if you do not have a coupon code, just click on the pay button</p>
              <p className='mt-1 mb-1 text-sm text-red-600 font-medium'>
                Please note: No coupons are available for Mixtape Watermark removal. Kindly proceed by clicking <span className='font-semibold text-blue-600'>Pay</span> to complete your purchase.
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
