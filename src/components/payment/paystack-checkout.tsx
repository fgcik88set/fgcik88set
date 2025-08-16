"use client"

import React, { useState, useEffect, useCallback } from "react"
import { X, Loader2 } from "lucide-react"

interface PaystackCheckoutProps {
  amount: number
  email: string
  name: string
  narration: string
  currency: string
  onSuccess: (reference: string) => void
  onError: (error: string) => void
  onClose: () => void
}

interface PaystackResponse {
  reference: string
  status: string
  message: string
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => { openIframe: () => void }
    }
    __PAYSTACK_PUBLIC_KEY__?: string
  }
}

interface PaystackOptions {
  key: string
  email: string
  amount: number
  currency: string
  ref: string
  callback: (response: PaystackResponse) => void
  onClose: () => void
  metadata: {
    custom_fields: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
  }
}

export default function PaystackCheckout({ 
  amount, 
  email, 
  name, 
  narration, 
  currency, 
  onSuccess, 
  onError: _onError, 
  onClose 
}: PaystackCheckoutProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const initializePaystack = useCallback(() => {
    console.log("Initializing Paystack...")
    console.log("Window.PaystackPop:", window.PaystackPop)
    
    // Try multiple ways to get the public key
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 
                     (typeof window !== 'undefined' && window.__PAYSTACK_PUBLIC_KEY__) ||
                     "pk_test_16fb0d9d970c6ac36268a8b3bdd201f11d14a3c5" // Fallback to your test key
    
    console.log("Public Key:", publicKey)
    
    if (!window.PaystackPop) {
      console.error("PaystackPop not found on window object")
      setError("Paystack failed to initialize. Please try again.")
      return
    }

    if (!publicKey) {
      console.error("Paystack public key not found")
      setError("Payment configuration error. Please contact support.")
      return
    }

    try {
      // Generate unique reference
      const reference = `pk_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
      console.log("Generated reference:", reference)

      const paystackOptions: PaystackOptions = {
        key: publicKey,
        email: email,
        amount: Math.round(amount * 100), // Convert to kobo
        currency: currency,
        ref: reference,
        callback: function(response: PaystackResponse) {
          console.log("Paystack callback received:", response)
          
          // Handle the response synchronously first
          if (response.status === "success" || response.reference) {
            // Call success immediately
            onSuccess(reference)
            
            // Then handle database recording asynchronously
            handlePaymentRecording(response, reference)
          } else {
            console.error("Payment failed:", response)
            setError("Payment failed. Please try again.")
          }
        },
        onClose: function() {
          console.log("Paystack checkout closed")
          onClose()
        },
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: name
            },
            {
              display_name: "Payment Purpose",
              variable_name: "payment_purpose",
              value: narration
            }
          ]
        }
      }

      // Separate function to handle payment recording
      const handlePaymentRecording = async (response: PaystackResponse, reference: string) => {
        try {
          // Store successful payment in database
          const paymentRecord = {
            reference: reference,
            user_email: email,
            name: name,
            narration: narration,
            amount: amount,
            currency: currency,
            status: "success",
            gateway_response: JSON.stringify(response),
            transaction_id: response.reference || reference,
          }

          const { data, error } = await fetch("/api/payments/record", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentRecord),
          }).then(res => res.json())

          if (error) {
            console.error("Failed to record payment:", error)
          } else {
            console.log("Payment recorded successfully:", data)
          }
        } catch (err) {
          console.error("Error recording payment:", err)
          // Don't fail the payment if recording fails
        }
      }

      console.log("Paystack options:", paystackOptions)
      console.log("Callback function type:", typeof paystackOptions.callback)
      console.log("Callback function:", paystackOptions.callback)
      
      const handler = window.PaystackPop.setup(paystackOptions)
      console.log("Paystack handler created:", handler)
      handler.openIframe()
    } catch (err) {
      console.error("Paystack initialization error:", err)
      setError("Failed to initialize payment. Please try again.")
    }
  }, [amount, email, name, narration, currency, onSuccess, onClose])

  useEffect(() => {
    console.log("Loading Paystack script...")
    
    // Check network connectivity
    if (!navigator.onLine) {
      console.error("No internet connection detected")
      setError("No internet connection detected. Please check your network and try again.")
      setLoading(false)
      return
    }
    
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="paystack"]')
    if (existingScript) {
      console.log("Paystack script already exists, checking if ready...")
      if (window.PaystackPop && typeof window.PaystackPop.setup === 'function') {
        console.log("PaystackPop already ready, initializing...")
        setLoading(false)
        initializePaystack()
        return
      }
    }
    
    // Inject the public key into window for better accessibility
    if (typeof window !== 'undefined') {
      window.__PAYSTACK_PUBLIC_KEY__ = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    }
    
    // Multiple CDN fallbacks for Paystack with CORS handling
    const cdnUrls = [
      'https://js.paystack.co/v1/inline.js',
      'https://cdn.paystack.co/v1/inline.js',
      'https://checkout.paystack.co/v1/inline.js'
    ]
    
    // For development, try to load without CORS restrictions first
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    
    let currentCdnIndex = 0
    
    const loadScript = (cdnIndex: number) => {
      if (cdnIndex >= cdnUrls.length) {
        console.error("All CDN fallbacks failed")
        
        // Try to provide a helpful error message
        if (isDevelopment) {
          setError("CORS error detected in development. Try: 1) Using Chrome with --disable-web-security, 2) Using Firefox, 3) Testing in production, or 4) Contact support for a development solution.")
        } else {
          setError("Unable to load payment system. This might be due to network issues or firewall restrictions. Please try again later or contact support.")
        }
        setLoading(false)
        return
      }
      
      const script = document.createElement('script')
      script.src = cdnUrls[cdnIndex]
      script.async = true
      
      // In development, try without crossOrigin first
      if (!isDevelopment) {
        script.crossOrigin = "anonymous"
      }
      
      console.log(`Trying CDN ${cdnIndex + 1}: ${cdnUrls[cdnIndex]} (Development: ${isDevelopment})`)
      
      script.onload = () => {
        clearTimeout(timeout)
        console.log(`Paystack script loaded successfully from: ${cdnUrls[cdnIndex]}`)
        console.log("Window.PaystackPop after load:", window.PaystackPop)
        console.log("PaystackPop.setup type:", typeof window.PaystackPop?.setup)
        
        // Wait a bit more to ensure PaystackPop is fully available
        setTimeout(() => {
          if (window.PaystackPop && typeof window.PaystackPop.setup === 'function') {
            console.log("PaystackPop is ready, initializing...")
            setLoading(false)
            initializePaystack()
          } else {
            console.error("PaystackPop.setup is not a function:", window.PaystackPop)
            setError("Payment system failed to initialize properly. Please try again.")
            setLoading(false)
          }
        }, 1000) // Wait 1 second for full initialization
      }

      script.onerror = (error) => {
        console.error(`Failed to load Paystack script from ${cdnUrls[cdnIndex]}:`, error)
        
        // Check if it's a CORS error
        if (error.toString().includes('CORS') || error.toString().includes('Access-Control-Allow-Origin')) {
          console.warn(`CORS error detected for ${cdnUrls[cdnIndex]}, trying next CDN...`)
        }
        
        // Try next CDN
        currentCdnIndex++
        if (currentCdnIndex < cdnUrls.length) {
          console.log(`Trying next CDN fallback...`)
          loadScript(currentCdnIndex)
        } else {
          console.error("All CDN fallbacks failed")
          
          // Provide specific guidance for CORS issues
          if (isDevelopment) {
            setError("CORS error detected. This is common in development. Try: 1) Using Chrome with --disable-web-security, 2) Using Firefox, 3) Testing in production, or 4) Contact support for a development solution.")
          } else {
            setError("Failed to load payment system. Please check your internet connection and try again.")
          }
          setLoading(false)
        }
      }

      // Add timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        if (script.parentNode) {
          console.error(`CDN ${cdnIndex + 1} timeout: ${cdnUrls[cdnIndex]}`)
          script.remove()
          
          // Try next CDN
          currentCdnIndex++
          if (currentCdnIndex < cdnUrls.length) {
            console.log(`Trying next CDN fallback due to timeout...`)
            loadScript(currentCdnIndex)
          } else {
            setError("Payment system took too long to load. Please try again.")
            setLoading(false)
          }
        }
      }, 10000) // 10 second timeout per CDN

      document.head.appendChild(script)
    }
    
    // Start with first CDN
    loadScript(currentCdnIndex)

    return () => {
      // Cleanup any scripts we added
      const scriptsToRemove = document.querySelectorAll('script[src*="paystack"]')
      scriptsToRemove.forEach(script => {
        if (script.parentNode) {
          script.remove()
        }
      })
    }
  }, [initializePaystack])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#0c347d" }} />
            <span className="text-lg font-medium" style={{ color: "#0c347d" }}>Initializing Paystack...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: "#0c347d", color: "white" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0a2a5a"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0c347d"
                }}
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
} 