"use client"

import React, { useState } from "react"
import { Loader2, CreditCard } from "lucide-react"
import { useAuth } from "@/providers/session-provider"

interface CheckoutFormProps {
  initialAmount?: number
  currency?: string
  onSuccess?: (reference: string) => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    PaystackPop: unknown
  }
}

const PRESET_AMOUNTS = [5000, 10000, 15000, 20000]

const PAYMENT_TYPES = [
  { id: "dues", label: "Dues and Registration", narration: "Dues and Registration Payment" },
  { id: "welfare", label: "Welfare Payment", narration: "Welfare Payment" },
  { id: "other", label: "Other Payments", narration: "" }
]

export function CheckoutForm({ initialAmount = 5000, currency = "NGN", onSuccess, onError }: CheckoutFormProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [paymentType, setPaymentType] = useState("dues");
  const [narration, setNarration] = useState("Dues and Registration Payment");
  const [loading, setLoading] = useState(false);
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (amount <= 0) {
      setError("Please enter a valid amount")
      setLoading(false)
      return
    }

    if (!narration.trim()) {
      setError("Please provide a narration for your payment")
      setLoading(false)
      return
    }

    try {
      // Initialize payment with backend
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          amount,
          currency,
          narration,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment")
      }

      // Load Paystack inline script
      const script = document.createElement("script")
      script.src = "https://js.paystack.co/v1/inline.js"
      script.onload = () => {
        interface PaystackSetupOptions {
          key: string | undefined
          email: string
          amount: number
          currency: string
          ref: string
          callback: (response: { reference: string }) => void
          onClose: () => void
        }
        const paystackPop = window.PaystackPop as {
          setup: (options: PaystackSetupOptions) => { openIframe: () => void }
        }
        const handler = paystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: email,
          amount: data.amount,
          currency: currency,
          ref: data.reference,
          callback: (response: { reference: string }) => {
            // Payment successful
            onSuccess?.(response.reference)
            // Redirect to success page
            window.location.href = `/payment/success?reference=${response.reference}`
          },
          onClose: () => {
            setLoading(false)
            setError("Payment was cancelled")
          },
        })
        handler.openIframe()
      }
      document.head.appendChild(script)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      onError?.(err instanceof Error ? err.message : "An error occurred")
      setLoading(false)
    }
  }

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
        <p className="text-gray-600 text-center">Complete your payment securely with Paystack</p>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <form onSubmit={handlePayment} className="space-y-6">
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
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={loading}
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
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
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
                    disabled={loading}
                    className={`px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      amount === presetAmount
                        ? "border-transparent text-white shadow-sm"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: amount === presetAmount ? "#0c347d" : undefined,
                      borderColor: amount === presetAmount ? "#0c347d" : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (amount !== presetAmount && !loading) {
                        e.currentTarget.style.backgroundColor = "#f9fafb"
                        e.currentTarget.style.borderColor = "#0c347d"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (amount !== presetAmount && !loading) {
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

          <button
            type="submit"
            disabled={loading || !email || amount <= 0 || !narration.trim()}
            className="w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            style={{
              backgroundColor: loading || !email || amount <= 0 || !narration.trim() ? "#9ca3af" : "#0c347d",
            }}
            onMouseEnter={(e) => {
              if (!loading && email && amount > 0 && narration.trim()) {
                e.currentTarget.style.backgroundColor = "#0a2d6b"
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && email && amount > 0 && narration.trim()) {
                e.currentTarget.style.backgroundColor = "#0c347d"
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${currency} ${amount.toLocaleString()}`
            )}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>🔒 Your payment is secured by Paystack</p>
        </div>
      </div>
    </div>
  )
}
