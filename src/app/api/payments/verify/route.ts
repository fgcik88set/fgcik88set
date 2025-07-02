import { type NextRequest, NextResponse } from "next/server"
import { getPaymentByReference, updatePayment } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 })
    }

    // Check if payment exists in our database
    const { data: existingPayment, error: dbError } = await getPaymentByReference(reference)

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    if (!existingPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })

    const paystackData = await paystackResponse.json()

    if (!paystackData.status) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const transaction = paystackData.data

    // Update payment record in database
    const { data: updatedPayment, error: updateError } = await updatePayment(reference, {
      transaction_id: transaction.id.toString(),
      status: transaction.status,
      gateway_response: JSON.stringify(transaction),
    })

    if (updateError || !updatedPayment) {
      console.error("Database update error:", updateError)
      return NextResponse.json({ error: "Failed to update payment record" }, { status: 500 })
    }

    return NextResponse.json({
      status: "success",
      data: {
        reference: transaction.reference,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        paid_at: transaction.paid_at,
        email: updatedPayment.user_email,
      },
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
