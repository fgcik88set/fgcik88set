process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { Pool } from "pg";

// Create a connection pool (should be a singleton in your application)
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: process.env.NODE_ENV === "production" && {
    rejectUnauthorized: false,
    // ca: process.env.SUPABASE_CA_CERT,
  },
});

export interface Payment {
  id: string;
  transaction_id?: string;
  reference: string;
  user_email: string;
  amount: number;
  currency: string;
  status: string;
  gateway_response?: string;
  created_at: string;
  updated_at: string;
}

export const createPayment = async (paymentData: {
  reference: string;
  user_email: string;
  amount: number;
  currency: string;
  status: string;
}) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO payment (reference, user_email, amount, currency, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [
        paymentData.reference,
        paymentData.user_email,
        paymentData.amount,
        paymentData.currency,
        paymentData.status,
      ]
    );
    return { data: result.rows[0], error: null };
  } catch (error) {
    console.error("Database error creating payment:", error);
    return { data: null, error };
  } finally {
    client.release();
  }
};

export const updatePayment = async (
  reference: string,
  updateData: {
    transaction_id?: string;
    status?: string;
    gateway_response?: string;
  }
) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE payment 
       SET 
         transaction_id = COALESCE($1, transaction_id),
         status = COALESCE($2, status),
         gateway_response = COALESCE($3, gateway_response),
         updated_at = NOW()
       WHERE reference = $4
       RETURNING *`,
      [
        updateData.transaction_id,
        updateData.status,
        updateData.gateway_response,
        reference,
      ]
    );
    return { data: result.rows[0] || null, error: null };
  } catch (error) {
    console.error("Database error updating payment:", error);
    return { data: null, error };
  } finally {
    client.release();
  }
};

export const getPaymentByReference = async (reference: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM payment WHERE reference = $1`,
      [reference]
    );
    return { data: result.rows[0] || null, error: null };
  } catch (error) {
    console.error("Database error getting payment:", error);
    return { data: null, error };
  } finally {
    client.release();
  }
};

export const getPaymentsByEmail = async (email: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM payment 
       WHERE user_email = $1 
       ORDER BY created_at DESC`,
      [email]
    );
    return { data: result.rows, error: null };
  } catch (error) {
    console.error("Database error getting payments by email:", error);
    return { data: [], error };
  } finally {
    client.release();
  }
};
