if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg"; // Use pg instead of @vercel/postgres


const sslConfig = process.env.NODE_ENV === "production" && {
  ca: process.env.SUPABASE_CA_CERT,
  rejectUnauthorized: true,
};

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: sslConfig,
});

export async function POST(request: NextRequest) {
  let client;
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Get client from pool
    client = await pool.connect();

    // Check if user already exists
    const userCheck = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userCheck.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await client.query(
      `INSERT INTO users (name, email, password, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
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
    // Release client back to pool
    if (client) client.release();
  }
}
