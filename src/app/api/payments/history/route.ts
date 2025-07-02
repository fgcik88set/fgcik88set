import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { getPaymentsByEmail } from "@/lib/database"
import { authOptions } from "@/lib/auth"

export async function GET(_request: NextRequest) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get payment history for the authenticated user
    const { data: payments, error } = await getPaymentsByEmail(session.user.email)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch payment history" }, { status: 500 })
    }

    // Format the response to exclude sensitive information
    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      reference: payment.reference,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      created_at: payment.created_at,
    }))

    return NextResponse.json({
      status: "success",
      data: formattedPayments,
    })
  } catch (error) {
    console.error("Payment history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
