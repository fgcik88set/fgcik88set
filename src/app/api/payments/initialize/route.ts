import { type NextRequest, NextResponse } from "next/server"
import { generateReference, formatAmount, generateSeerbitHash } from "@/lib/seerbit"
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

    // Generate Seerbit hash for security
    const hashData = `${process.env.NEXT_PUBLIC_SEERBIT_PUBLIC_KEY}${reference}${formattedAmount}${currency}${email}`
    const hash = generateSeerbitHash(hashData)

    // Initialize payment with Seerbit - using the correct working endpoint
    const seerbitResponse = await fetch("https://seerbitapi.com/api/v2/seerbit/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey: process.env.NEXT_PUBLIC_SEERBIT_PUBLIC_KEY,
        amount: formattedAmount,
        currency: currency,
        country: "NG",
        reference: reference,
        email: email,
        narration: narration,
        callbackUrl: `${process.env.NEXTAUTH_URL}/payment/success`,
        hash: hash,
        paymentType: "card",
        channelType: "card",
        deviceType: "web",
        source: "web",
        retry: false,
        redirectUrl: `${process.env.NEXTAUTH_URL}/payment/success`,
      }),
    })

    const seerbitData = await seerbitResponse.json()

    if (seerbitData.code !== "00" && seerbitData.status !== "success") {
      console.error("Seerbit API Error:", seerbitData)
      return NextResponse.json({ error: seerbitData.message || "Failed to initialize payment" }, { status: 400 })
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
      authorization_url: seerbitData.data?.payments?.redirectLink || seerbitData.data?.payments?.checkoutUrl || seerbitData.data?.checkoutUrl,
      access_code: seerbitData.data?.payments?.code || seerbitData.data?.code,
      checkout_url: seerbitData.data?.payments?.checkoutUrl || seerbitData.data?.checkoutUrl,
    })
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
