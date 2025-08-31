process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { validateResetToken, deleteResetToken } from "@/lib/auth-utils";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function POST(request: NextRequest) {
  let client;
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate reset token
    const tokenValidation = await validateResetToken(token);

    if (!tokenValidation.valid || !tokenValidation.email) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    client = await pool.connect();

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password
    const result = await client.query(
      `UPDATE users SET password = $1, updated_at = NOW() WHERE email = $2 RETURNING id, name, email`,
      [hashedPassword, tokenValidation.email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the used reset token
    await deleteResetToken(token);

    const user = result.rows[0];

    return NextResponse.json({
      message: "Password reset successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : null,
      },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}
