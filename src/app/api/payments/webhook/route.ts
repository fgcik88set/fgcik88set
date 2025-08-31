import { type NextRequest, NextResponse } from "next/server"
import { verifySeerbitSignature } from "@/lib/seerbit"
import { updatePayment, getPaymentByReference } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-seerbit-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    const isValidSignature = verifySeerbitSignature(body, signature)
    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(body)

    // Handle different event types for Seerbit React package
    if (event.event === "payment.success" || event.event === "charge.success" || event.event === "success" || event.status === "success") {
      const transaction = event.data || event

      // Check if payment exists in our database
      const { data: existingPayment, error: dbError } = await getPaymentByReference(transaction.reference)

      if (dbError) {
        console.error("Webhook database error:", dbError)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
      }

      if (!existingPayment) {
        console.error(`Payment not found for reference: ${transaction.reference}`)
        return NextResponse.json({ error: "Payment not found" }, { status: 404 })
      }

      // Update payment record
      const { error: updateError } = await updatePayment(transaction.reference, {
        transaction_id: transaction.id?.toString() || transaction.transactionId?.toString(),
        status: "success",
        gateway_response: JSON.stringify(transaction),
      })

      if (updateError) {
        console.error("Webhook database update error:", updateError)
        return NextResponse.json({ error: "Database update failed" }, { status: 500 })
      }

      console.log(`Payment successful for reference: ${transaction.reference}`)
    }

    // Handle failed payments
    if (event.event === "payment.failed" || event.event === "charge.failed" || event.event === "failed" || event.status === "failed") {
      const transaction = event.data || event

      const { data: existingPayment, error: dbError } = await getPaymentByReference(transaction.reference)

      if (!dbError && existingPayment) {
        await updatePayment(transaction.reference, {
          status: "failed",
          gateway_response: JSON.stringify(transaction),
        })
      }
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
