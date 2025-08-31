import crypto from "crypto";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const saveResetToken = async (email: string, token: string) => {
  let client;
  try {
    client = await pool.connect();

    // Delete any existing reset tokens for this email
    await client.query(`DELETE FROM password_reset_tokens WHERE email = $1`, [
      email,
    ]);

    // Insert new reset token with 1 hour expiry
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await client.query(
      `INSERT INTO password_reset_tokens (email, token, expires_at, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [email, token, expiresAt]
    );

    return { success: true };
  } catch (error) {
    console.error("Save reset token error:", error);
    return { success: false, error };
  } finally {
    if (client) client.release();
  }
};

export const validateResetToken = async (token: string) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `SELECT email, expires_at FROM password_reset_tokens 
       WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) {
      return { valid: false, email: null };
    }

    return { valid: true, email: result.rows[0].email };
  } catch (error) {
    console.error("Validate reset token error:", error);
    return { valid: false, email: null };
  } finally {
    if (client) client.release();
  }
};

export const deleteResetToken = async (token: string) => {
  let client;
  try {
    client = await pool.connect();

    await client.query(`DELETE FROM password_reset_tokens WHERE token = $1`, [
      token,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Delete reset token error:", error);
    return { success: false, error };
  } finally {
    if (client) client.release();
  }
};
