-- Create users table with simplified schema
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255), -- NULL for OAuth users
  provider VARCHAR(50), -- 'credentials', 'google', etc.
  provider_id VARCHAR(255), -- OAuth provider ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on provider fields for OAuth lookups
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);

-- Create payment table if it doesn't exist
CREATE TABLE IF NOT EXISTS payment (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255) UNIQUE NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  narration VARCHAR(500),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'NGN',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  transaction_id VARCHAR(255),
  gateway_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add name column to payment table if it doesn't exist
ALTER TABLE payment ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Add narration column to payment table if it doesn't exist
ALTER TABLE payment ADD COLUMN IF NOT EXISTS narration VARCHAR(500);

-- Create indexes for payment table
CREATE INDEX IF NOT EXISTS idx_payment_reference ON payment(reference);
CREATE INDEX IF NOT EXISTS idx_payment_user_email ON payment(user_email);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment(status);
