# Seerbit Payment Gateway Integration

This document outlines the integration of Seerbit payment gateway to replace the previous Paystack implementation.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Seerbit Configuration
SEERBIT_PUBLIC_KEY=your_seerbit_public_key_here
SEERBIT_SECRET_KEY=your_seerbit_secret_key_here
NEXT_PUBLIC_SEERBIT_PUBLIC_KEY=your_seerbit_public_key_here

# Other required variables
NEXTAUTH_URL=http://localhost:3000
POSTGRES_URL_NO_SSL=your_postgres_connection_string
```

## Features

### 1. Payment Initialization
- Generates unique payment references with `sb_` prefix
- Creates payment records in the database
- Initializes Seerbit payment session

### 2. Secure Checkout
- Uses Seerbit's hosted checkout iframe
- Handles payment success, failure, and cancellation
- Redirects to success page on successful payment

### 3. Webhook Handling
- Processes Seerbit webhook notifications
- Updates payment status in database
- Handles both successful and failed payments

### 4. Payment Verification
- Verifies payment status with Seerbit API
- Updates local database records
- Provides payment confirmation data

## API Endpoints

### POST /api/payments/initialize
Initializes a new payment session with Seerbit.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 5000,
  "currency": "NGN",
  "narration": "Dues and Registration Payment"
}
```

**Response:**
```json
{
  "status": true,
  "reference": "sb_1234567890_abc123",
  "amount": 500000,
  "checkout_url": "https://checkout.seerbitapi.com/...",
  "access_code": "access_code_here"
}
```

### POST /api/payments/webhook
Handles Seerbit webhook notifications for payment status updates.

### GET /api/payments/verify?reference=xxx
Verifies payment status with Seerbit and updates local database.

## Database Schema

The payment table structure remains the same:

```sql
CREATE TABLE payment (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(255),
  reference VARCHAR(255) UNIQUE NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  narration TEXT,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  status VARCHAR(50) NOT NULL,
  gateway_response TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Components

### SeerbitCheckout
A React component that handles the Seerbit checkout iframe integration.

### CheckoutForm
The main payment form that collects user information and initiates payments.

## Security Features

1. **Hash Verification**: All Seerbit API calls include a hash for security
2. **Webhook Signature Verification**: Webhook requests are verified using HMAC SHA512
3. **Reference Uniqueness**: Each payment gets a unique reference to prevent duplicates

## Error Handling

The integration includes comprehensive error handling for:
- Payment initialization failures
- Checkout cancellations
- Payment failures
- Network errors
- Database errors

## Testing

To test the integration:

1. Use Seerbit's test environment credentials
2. Test with small amounts
3. Verify webhook delivery
4. Check database updates
5. Test payment verification

## Migration from Paystack

The following files were updated:
- `src/lib/seerbit.ts` (new file)
- `src/app/api/payments/initialize/route.ts`
- `src/app/api/payments/webhook/route.ts`
- `src/app/api/payments/verify/route.ts`
- `src/components/payment/checkout-form.tsx`
- `src/components/payment/seerbit-checkout.tsx` (new file)
- `src/components/payment/payment-page.tsx`

## Support

For Seerbit integration support:
- Refer to [Seerbit API Documentation](https://seerbit.com/api-docs)
- Contact Seerbit support for technical issues
- Check webhook delivery in Seerbit dashboard 