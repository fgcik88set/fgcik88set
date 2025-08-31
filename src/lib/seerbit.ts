// Simplified hash generation for Seerbit
const generateHash = (data: string, secretKey: string): string => {
  // Simple hash generation - Seerbit expects a basic hash
  return btoa(data + secretKey).replace(/[^a-zA-Z0-9]/g, '').substring(0, 64)
}

export interface SeerbitInitializeData {
  name: string
  email: string
  amount: number
  reference?: string
  currency?: string
  callback_url?: string
  narration?: string
}

export interface SeerbitResponse<T = unknown> {
  code: string
  message: string
  data?: T
}

export const generateReference = (): string => {
  return `sb_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export const formatAmount = (amount: number): number => {
  // Seerbit expects amount in kobo (multiply by 100)
  return Math.round(amount * 100)
}

export const verifySeerbitSignature = (payload: string, signature: string): boolean => {
  const secretKey = process.env.SEERBIT_SECRET_KEY || ''
  const hash = generateHash(payload, secretKey)
  return hash === signature
}

export const generateSeerbitHash = (data: string): string => {
  const secretKey = process.env.SEERBIT_SECRET_KEY || ''
  return generateHash(data, secretKey)
} 