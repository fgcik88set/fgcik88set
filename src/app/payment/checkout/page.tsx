"use client";

import CheckoutForm from "@/components/payment/checkout-form";



export default function CheckoutPage() {
  const handleSuccess = (reference: string) => {
    console.log("Payment successful:", reference);
  };

  const handleError = (error: string) => {
    console.error("Payment error:", error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32 px-4 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        

        <CheckoutForm
          initialAmount={5000}
          currency="NGN"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}
