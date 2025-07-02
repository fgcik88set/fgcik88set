"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

type PaymentData = {
  reference: string
  amount: number
  currency: string
  status: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")
  const [verifying, setVerifying] = useState(true)
  const [_verified, setVerified] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  useEffect(() => {
    if (reference) {
      verifyPayment(reference)
    }
  }, [reference])

  const verifyPayment = async (ref: string) => {
    try {
      const response = await fetch(`/api/payments/verify?reference=${ref}`)
      const data = await response.json()

      if (response.ok && data.status === "success") {
        setVerified(true)
        setPaymentData(data.data)
      }
    } catch (error) {
      console.error("Verification error:", error)
    } finally {
      setVerifying(false)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" style={{ color: "#0c347d" }} />
            <p>Verifying your payment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your transaction has been completed successfully</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {paymentData && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reference:</span>
                <span className="text-sm font-mono">{paymentData.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-sm font-semibold">
                  {paymentData.currency} {(paymentData.amount / 100).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm text-green-600 capitalize">{paymentData.status}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 text-center px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: "#0c347d", textDecoration: "none" }}
            >
              Go Home
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}
