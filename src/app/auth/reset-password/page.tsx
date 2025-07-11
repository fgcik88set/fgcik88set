"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Loader2, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (_error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="text-red-500 mb-4">
              <Lock className="h-12 w-12 mx-auto" />
            </div>
            <h1 className="text-xl font-bold text-red-600 mb-2">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-4">This password reset link is invalid or has expired.</p>
            <Link
              href="/auth/forgot-password"
              className="inline-block px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200"
              style={{ backgroundColor: "#0c347d", textDecoration: "none" }}
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="text-green-500 mb-4">
              <CheckCircle className="h-12 w-12 mx-auto" />
            </div>
            <h1 className="text-xl font-bold text-green-600 mb-2">Password Reset Successful!</h1>
            <p className="text-gray-600 mb-4">
              Your password has been successfully reset. You will be redirected to the login page shortly.
            </p>
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200"
              style={{ backgroundColor: "#0c347d", textDecoration: "none" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
            >
              <Lock className="h-8 w-8" style={{ color: "#0c347d" }} />
            </div>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#0c347d" }}>
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2">Enter your new password</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{ color: "#121212" }}>
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium" style={{ color: "#121212" }}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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

            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                backgroundColor: loading || !password || !confirmPassword ? "#9ca3af" : "#0c347d",
              }}
              onMouseEnter={(e) => {
                if (!loading && password && confirmPassword) {
                  e.currentTarget.style.backgroundColor = "#0a2d6b"
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && password && confirmPassword) {
                  e.currentTarget.style.backgroundColor = "#0c347d"
                }
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
