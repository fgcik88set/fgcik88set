"use client"

import React, { useState } from "react"
import { CreditCard } from "lucide-react"
import { useAuth } from "@/providers/session-provider"

// Import Seerbit hook properly
import { useSeerbitPayment } from "seerbit-reactjs"

interface CheckoutFormProps {
  initialAmount?: number
  currency?: string
  onSuccess?: (reference: string) => void
  onError?: (error: string) => void
}

const PRESET_AMOUNTS = [5000, 10000, 15000, 20000]

const PAYMENT_TYPES = [
  { id: "dues", label: "Dues and Registration", narration: "Dues and Registration Payment" },
  { id: "welfare", label: "Welfare Payment", narration: "Welfare Payment" },
  { id: "other", label: "Other Payments", narration: "" }
]

export default function CheckoutForm({ initialAmount = 5000, currency = "NGN", onSuccess, onError }: CheckoutFormProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [paymentType, setPaymentType] = useState("dues");
  const [narration, setNarration] = useState("Dues and Registration Payment");
  const [error, setError] = useState("");

  // Auto-update name and email from session
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Update narration when payment type changes
  React.useEffect(() => {
    const selectedType = PAYMENT_TYPES.find(type => type.id === paymentType);
    if (selectedType) {
      if (paymentType === "other") {
        setNarration("");
      } else {
        setNarration(selectedType.narration);
      }
    }
  }, [paymentType]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    setAmount(value)
  }

  const handlePresetAmountClick = (presetAmount: number) => {
    setAmount(presetAmount)
  }

  // Generate reference for this payment
  const reference = `sb_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

  // Seerbit payment options based on their hook documentation
  const options = {
    public_key: process.env.NEXT_PUBLIC_SEERBIT_PUBLIC_KEY!,
    amount: amount,
    tranref: reference,
    currency: currency,
    email: email,
    full_name: name,
    mobile_no: "", // Optional - you can add mobile field if needed
    description: narration,
    tokenize: false,
    planId: "",
    pocketId: "",
    vendorId: "",
    customization: {
      theme: {
        border_color: "#0c347d",
        background_color: "#ffffff",
        button_color: "#0c347d",
      },
      payment_method: ["card", "account", "transfer", "wallet", "ussd"],
      display_fee: true,
      display_type: "embed", // Using embed as per your example
      logo: "", // Optional - you can add your logo URL
    },
  }

  // Callback handlers as per Seerbit hook documentation
  const close = () => {
    console.log("Checkout closed");
    setError("Payment was cancelled");
  }

  const callback = async (response: { status?: string; code?: string; reference?: string }, closeCheckout: () => void) => {
    console.log("Payment response:", response);
    
    if (response.status === "success" || response.code === "00") {
      try {
        // Store successful payment in Supabase
        const paymentRecord = {
          reference: response.reference || reference,
          user_email: email,
          name: name,
          narration: narration,
          amount: amount,
          currency: currency,
          status: "success",
          gateway_response: JSON.stringify(response),
          transaction_id: response.reference || reference,
        };

        const { data, error } = await fetch("/api/payments/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentRecord),
        }).then(res => res.json());

        if (error) {
          console.error("Failed to record payment:", error);
        } else {
          console.log("Payment recorded successfully:", data);
        }

        onSuccess?.(response.reference || reference);
        // Redirect to success page
        window.location.href = `/payment/success?reference=${response.reference || reference}`;
      } catch (err) {
        console.error("Error recording payment:", err);
        // Still redirect on success even if recording fails
        onSuccess?.(response.reference || reference);
        window.location.href = `/payment/success?reference=${response.reference || reference}`;
      }
    } else {
      // Record failed payment
      try {
        const paymentRecord = {
          reference: reference,
          user_email: email,
          name: name,
          narration: narration,
          amount: amount,
          currency: currency,
          status: "failed",
          gateway_response: JSON.stringify(response),
        };

        await fetch("/api/payments/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentRecord),
        });
      } catch (err) {
        console.error("Error recording failed payment:", err);
      }

      setError("Payment failed. Please try again.");
      onError?.("Payment failed");
    }
    
    // Close checkout after 2 seconds as per your example
    setTimeout(() => closeCheckout(), 2000);
  }

  // Initialize Seerbit payment using the hook
  const initializePayment = useSeerbitPayment(options, callback, close);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 justify-center mb-2">
          <CreditCard className="h-5 w-5" style={{ color: "#0c347d" }} />
          <h2 className="text-xl font-bold" style={{ color: "#0c347d" }}>
            Secure Checkout
          </h2>
        </div>
        <p className="text-gray-600 text-center">Complete your payment securely with Seerbit</p>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium" style={{ color: "#121212" }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
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
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: "#121212" }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              onFocus={(e) => {
                e.target.style.borderColor = "#0c347d"
                e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>

          {/* Payment Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium" style={{ color: "#121212" }}>
              Payment Type
            </label>
            <div className="space-y-2">
              {PAYMENT_TYPES.map((type) => (
                <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentType"
                    value={type.id}
                    checked={paymentType === type.id}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-4 h-4 text-mainYellow border-gray-300 focus:ring-mainYellow"
                    style={{ accentColor: "#0c347d" }}
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Narration Field */}
          <div className="space-y-2">
            <label htmlFor="narration" className="block text-sm font-medium" style={{ color: "#121212" }}>
              Narration
            </label>
            <input
              id="narration"
              type="text"
              placeholder={paymentType === "other" ? "Please describe your payment purpose..." : "Payment narration"}
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              onFocus={(e) => {
                e.target.style.borderColor = "#0c347d"
                e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db"
                e.target.style.boxShadow = "none"
              }}
            />
            {paymentType !== "other" && (
              <p className="text-xs text-gray-500">
                You can edit this narration to add additional details if needed.
              </p>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium" style={{ color: "#121212" }}>
              Amount ({currency})
            </label>

            {/* Amount Input Field */}
            <input
              type="number"
              placeholder="Enter amount"
              value={amount || ""}
              onChange={handleAmountChange}
              min="100"
              step="100"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent text-lg font-semibold"
              onFocus={(e) => {
                e.target.style.borderColor = "#0c347d"
                e.target.style.boxShadow = `0 0 0 2px rgba(12, 52, 125, 0.2)`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db"
                e.target.style.boxShadow = "none"
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
                      amount === presetAmount
                        ? "border-transparent text-white shadow-sm"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: amount === presetAmount ? "#0c347d" : undefined,
                      borderColor: amount === presetAmount ? "#0c347d" : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (amount !== presetAmount) {
                        e.currentTarget.style.backgroundColor = "#f9fafb"
                        e.currentTarget.style.borderColor = "#0c347d"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (amount !== presetAmount) {
                        e.currentTarget.style.backgroundColor = "white"
                        e.currentTarget.style.borderColor = "#d1d5db"
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
                <span className="text-xl font-bold" style={{ color: "#0c347d" }}>
                  {currency} {amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Payment Button using Seerbit hook */}
          <button
            type="button"
            disabled={!email || amount <= 0 || !narration.trim()}
            onClick={initializePayment}
            className="w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: !email || amount <= 0 || !narration.trim() ? "#9ca3af" : "#0c347d",
            }}
          >
            Pay {currency} {amount.toLocaleString()}
          </button>

          
        </div>
      </div>
    </div>
  )
}
