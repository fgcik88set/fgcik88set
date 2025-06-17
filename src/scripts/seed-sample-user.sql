-- Insert a sample user for testing (password: "password123")
INSERT INTO users (name, email, password, provider, created_at) 
VALUES (
  'John Doe',
  'john@example.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', -- bcrypt hash of "password123"
  'credentials',
  NOW()
) ON CONFLICT (email) DO NOTHING;
