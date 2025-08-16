"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PaystackCheckout from "@/components/payment/paystack-checkout";
import { useAuth } from "@/providers/session-provider";

const PAYMENT_TYPES = [
  {
    id: "dues",
    label: "Dues & Registration",
    narration: "Dues and Registration Payment",
  },
  {
    id: "welfare",
    label: "Welfare",
    narration: "Welfare Payment",
  },
  {
    id: "event",
    label: "Event Payment",
    narration: "Event Registration and Payment",
  },
  { id: "other", label: "Other Payments", narration: "" },
];

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

export default function PaystackCheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showPaystack, setShowPaystack] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 5000,
    narration: "Dues and Registration Payment",
    currency: "NGN",
    paymentType: "dues",
  });

  // Auto-update name and email from session
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Update narration when payment type changes
  useEffect(() => {
    const selectedType = PAYMENT_TYPES.find(
      (type) => type.id === formData.paymentType
    );
    if (selectedType) {
      if (formData.paymentType === "other") {
        setFormData((prev) => ({ ...prev, narration: "" }));
      } else {
        setFormData((prev) => ({ ...prev, narration: selectedType.narration }));
      }
    }
  }, [formData.paymentType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handlePresetAmountClick = (presetAmount: number) => {
    setFormData((prev) => ({ ...prev, amount: presetAmount }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      formData.amount <= 0 ||
      !formData.narration.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setShowPaystack(true);
  };

  const handleSuccess = (reference: string) => {
    router.push(`/payment/success?reference=${reference}`);
  };

  const handleError = (error: string) => {
    console.error("Payment error:", error);
    setShowPaystack(false);
  };

  const handleClose = () => {
    setShowPaystack(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}

        {/* Payment Form */}
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-200">
            
              <Link
                href="/payment"
                className="inline-flex items-center text-mainYellow hover:text-yellow-600 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Payment
              </Link>
            
            <div className="flex items-center gap-2 justify-center mb-2">
              <CreditCard className="h-5 w-5" style={{ color: "#0c347d" }} />
              <h2 className="text-xl font-bold" style={{ color: "#0c347d" }}>
                Secure Checkout
              </h2>
            </div>
            <p className="text-gray-600 text-center">
              Complete your payment securely with Paystack
            </p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                  style={{ color: "#121212" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0c347d";
                    e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                  style={{ color: "#121212" }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0c347d";
                    e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Payment Type Selection */}
              <div className="space-y-3">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#121212" }}
                >
                  Payment Type
                </label>
                <div className="space-y-2">
                  {PAYMENT_TYPES.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value={type.id}
                        checked={formData.paymentType === type.id}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-mainYellow border-gray-300 focus:ring-mainYellow"
                        style={{ accentColor: "#0c347d" }}
                      />
                      <span className="text-sm text-gray-700">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Narration Field */}
              <div className="space-y-2">
                <label
                  htmlFor="narration"
                  className="block text-sm font-medium"
                  style={{ color: "#121212" }}
                >
                  Narration
                </label>
                <input
                  id="narration"
                  name="narration"
                  type="text"
                  placeholder={
                    formData.paymentType === "other"
                      ? "Please describe your payment purpose..."
                      : "Payment narration"
                  }
                  value={formData.narration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0c347d";
                    e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {formData.paymentType !== "other" && (
                  <p className="text-xs text-gray-500">
                    You can edit this narration to add additional details if
                    needed.
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#121212" }}
                >
                  Amount ({formData.currency})
                </label>

                {/* Amount Input Field */}
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount || ""}
                  onChange={handleInputChange}
                  min="100"
                  step="100"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent text-sm font-semibold"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0c347d";
                    e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />

                {/* Preset Amount Buttons */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Quick select:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_AMOUNTS.map((presetAmount) => (
                      <button
                        key={presetAmount}
                        type="button"
                        onClick={() => handlePresetAmountClick(presetAmount)}
                        className={`px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
                          formData.amount === presetAmount
                            ? "border-transparent text-white shadow-sm"
                            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                        }`}
                        style={{
                          backgroundColor:
                            formData.amount === presetAmount
                              ? "#0c347d"
                              : undefined,
                          borderColor:
                            formData.amount === presetAmount
                              ? "#0c347d"
                              : undefined,
                        }}
                        onMouseEnter={(e) => {
                          if (formData.amount !== presetAmount) {
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                            e.currentTarget.style.borderColor = "#0c347d";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.amount !== presetAmount) {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.borderColor = "#d1d5db";
                          }
                        }}
                      >
                        ₦{presetAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Selected Amount */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#0c347d" }}
                    >
                      {formData.currency} {formData.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !formData.email ||
                  formData.amount <= 0 ||
                  !formData.narration.trim()
                }
                className="w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    !formData.email ||
                    formData.amount <= 0 ||
                    !formData.narration.trim()
                      ? "#9ca3af"
                      : "#0c347d",
                }}
              >
                Pay {formData.currency} {formData.amount.toLocaleString()}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>🔒 Your payment is secured by Paystack</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Paystack Checkout Component */}
      {showPaystack && (
        <PaystackCheckout
          amount={formData.amount}
          email={formData.email}
          name={formData.name}
          narration={formData.narration}
          currency={formData.currency}
          onSuccess={handleSuccess}
          onError={handleError}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
