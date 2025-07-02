import { type NextRequest, NextResponse } from "next/server"
import { verifyPaystackSignature } from "@/lib/paystack"
import { updatePayment, getPaymentByReference } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    if (!verifyPaystackSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(body)

    // Handle different event types
    if (event.event === "charge.success") {
      const transaction = event.data

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
        transaction_id: transaction.id.toString(),
        status: "success",
        gateway_response: JSON.stringify(transaction),
      })

      if (updateError) {
        console.error("Webhook database update error:", updateError)
        return NextResponse.json({ error: "Database update failed" }, { status: 500 })
      }

      // Here you can add additional logic like:
      // - Send confirmation email
      // - Update user account
      // - Trigger order fulfillment
      console.log(`Payment successful for reference: ${transaction.reference}`)

      // You could also trigger other actions here
      // await sendPaymentConfirmationEmail(existingPayment.user_email, transaction)
      // await updateUserMembershipStatus(existingPayment.user_email)
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
