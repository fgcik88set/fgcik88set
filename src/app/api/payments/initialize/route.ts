import { type NextRequest, NextResponse } from "next/server"
import { generateReference, formatAmount } from "@/lib/paystack"
import { createPayment } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const {name, email, amount, currency = "NGN", narration } = await request.json()

    // Validate input
    if (!email || !amount || !narration) {
      return NextResponse.json({ error: "Email, amount, and narration are required" }, { status: 400 })
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 })
    }

    if (!narration.trim()) {
      return NextResponse.json({ error: "Narration is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const reference = generateReference()
    const formattedAmount = formatAmount(amount)

    // Initialize payment with Paystack
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        amount: formattedAmount,
        currency,
        reference,
        callback_url: `${process.env.NEXTAUTH_URL}/payment/success`,
      }),
    })

    const paystackData = await paystackResponse.json()

    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message || "Failed to initialize payment" }, { status: 400 })
    }

    // Store payment record in database using Vercel Postgres
    const { data: paymentRecord, error: dbError } = await createPayment({
      reference,
      user_email: email,
      name,
      narration,
      amount,
      currency,
      status: "pending",
    })

    if (dbError || !paymentRecord) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 })
    }

    return NextResponse.json({
      status: true,
      reference,
      amount: formattedAmount,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
    })
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
