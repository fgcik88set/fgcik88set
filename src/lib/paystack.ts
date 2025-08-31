import crypto from "crypto"

export interface PaystackInitializeData {
  name:string
  email: string
  amount: number
  reference?: string
  currency?: string
  callback_url?: string
}

export interface PaystackResponse<T = unknown> {
  status: boolean
  message: string
  data?: T
}

export const generateReference = (): string => {
  return `ps_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export const formatAmount = (amount: number): number => {
  // Paystack expects amount in kobo (multiply by 100)
  return Math.round(amount * 100)
}



export const verifyPaystackSignature = (payload: string, signature: string): boolean => {
  const hash = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!).update(payload).digest("hex")

  return hash === signature
}
