process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import { type NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

import { sendPasswordResetEmail } from "@/lib/email"
import { generateResetToken, saveResetToken } from "@/lib/auth-utils"



const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export async function POST(request: NextRequest) {
  let client
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    client = await pool.connect()

    // Check if user exists
    const userResult = await client.query(`SELECT name, email FROM users WHERE email = $1`, [email])

    if (userResult.rows.length === 0) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        message: "If an account with that email exists, we've sent a password reset link.",
      })
    }

    const user = userResult.rows[0]

    // Generate reset token
    const resetToken = generateResetToken()

    // Save reset token to database
    const tokenResult = await saveResetToken(email, resetToken)

    if (!tokenResult.success) {
      throw new Error("Failed to save reset token")
    }

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(email, user.name, resetToken)

    if (!emailResult.success) {
      console.error("Failed to send password reset email:", emailResult.error)
      return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 })
    }

    return NextResponse.json({
      message: "If an account with that email exists, we've sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : null,
      },
      { status: 500 },
    )
  } finally {
    if (client) client.release()
  }
}
