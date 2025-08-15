import { type NextRequest, NextResponse } from "next/server"
import { createPayment, updatePayment } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json()

    // Validate required fields
    if (!paymentData.reference || !paymentData.user_email || !paymentData.amount) {
      return NextResponse.json({ 
        error: "Reference, user_email, and amount are required" 
      }, { status: 400 })
    }

    // Check if payment already exists
    if (paymentData.status === "success") {
      // For successful payments, try to update existing record or create new one
      const { data: existingPayment, error: getError } = await createPayment({
        reference: paymentData.reference,
        user_email: paymentData.user_email,
        name: paymentData.name || "",
        narration: paymentData.narration || "",
        amount: paymentData.amount,
        currency: paymentData.currency || "NGN",
        status: paymentData.status,
      })

      if (getError) {
        console.error("Error creating payment record:", getError)
        return NextResponse.json({ 
          error: "Failed to create payment record" 
        }, { status: 500 })
      }

      // If payment was created successfully, update it with transaction details
      if (paymentData.transaction_id) {
        const { error: updateError } = await updatePayment(paymentData.reference, {
          transaction_id: paymentData.transaction_id,
          gateway_response: paymentData.gateway_response,
        })

        if (updateError) {
          console.error("Error updating payment with transaction details:", updateError)
        }
      }

      return NextResponse.json({
        status: "success",
        data: existingPayment,
        message: "Payment recorded successfully"
      })

    } else {
      // For failed payments, create a new record
      const { data: paymentRecord, error: createError } = await createPayment({
        reference: paymentData.reference,
        user_email: paymentData.user_email,
        name: paymentData.name || "",
        narration: paymentData.narration || "",
        amount: paymentData.amount,
        currency: paymentData.currency || "NGN",
        status: paymentData.status,
      })

      if (createError || !paymentRecord) {
        console.error("Error creating failed payment record:", createError)
        return NextResponse.json({ 
          error: "Failed to create payment record" 
        }, { status: 500 })
      }

      return NextResponse.json({
        status: "success",
        data: paymentRecord,
        message: "Failed payment recorded successfully"
      })
    }

  } catch (error) {
    console.error("Payment recording error:", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
} 