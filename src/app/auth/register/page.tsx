import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Alumni Association",
  description: "Create your alumni account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join Our Community</h2>
          <p className="mt-2 text-sm text-gray-600">Create your alumni account to connect with fellow graduates</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
