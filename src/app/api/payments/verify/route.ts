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
      return NextResponse.json({ error: "Database error" }, { status: 400 })
    }

    if (!existingPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Verify payment with Seerbit checkout API
    const seerbitResponse = await fetch(`https://seerbitapi.com/api/v2/seerbit/checkout/${reference}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const seerbitData = await seerbitResponse.json()

    if (seerbitData.code !== "00" && seerbitData.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const transaction = seerbitData.data

    // Update payment record in database
    const { data: updatedPayment, error: updateError } = await updatePayment(reference, {
      transaction_id: transaction.id?.toString() || transaction.transactionId?.toString(),
      status: transaction.status || "success",
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
        narration: updatedPayment.narration,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        paid_at: transaction.paidAt || transaction.paid_at,
        email: updatedPayment.user_email,
      },
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
