"use client"

import { useAuth } from "@/providers/session-provider"
import { useRouter } from "next/navigation"

import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectPath?: string
  loadingFallback?: React.ReactNode
}

export default function ProtectedRoute({
  children,
  redirectPath = "auth/login",
  loadingFallback = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const { status, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(redirectPath)
    }
  }, [status, router, redirectPath])

  if (status === "loading") {
    return loadingFallback
  }

  if (status === "authenticated" && user) {
    return <>{children}</>
  }

  // Fallback for unauthenticated state (will redirect before reaching this)
  return loadingFallback
}