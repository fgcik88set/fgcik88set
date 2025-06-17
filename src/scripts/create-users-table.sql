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
