import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

export interface RegisterData {
  name: string
  email: string
  password: string
  
}

export interface LoginData {
  email: string
  password: string
}
