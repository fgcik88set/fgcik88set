
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

// const sslConfig =
//   process.env.NODE_ENV === "production"
//     ? {
//         ca: process.env.SUPABASE_CA_CERT,
//         rejectUnauthorized: !!process.env.SUPABASE_CA_CERT, // Only verify if CA exists
//       }
//     : {
//         // Development: Skip verification for self-signed certs
//         rejectUnauthorized: false,
//       };

const sslConfig = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false


// Create PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: sslConfig,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let client;
        try {
          client = await pool.connect();

          // Get user from database
          const result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email]
          );

          const user = result.rows[0];

          if (!user) {
            return null;
          }

          // Compare passwords
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        } finally {
          if (client) client.release();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to token on initial sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        let client;
        try {
          client = await pool.connect();

          // Check if user exists
          const userCheck = await client.query(
            "SELECT id FROM users WHERE email = $1",
            [user.email]
          );

          if (userCheck.rows.length === 0) {
            // Create new user for OAuth
            await client.query(
              `INSERT INTO users (email, name, provider, provider_id, created_at)
               VALUES ($1, $2, $3, $4, NOW())`,
              [
                user.email,
                user.name || user.email.split("@")[0],
                account.provider,
                account.providerAccountId,
              ]
            );
          }
          return true;
        } catch (error) {
          console.error("OAuth sign in error:", error);
          return false;
        } finally {
          if (client) client.release();
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};


export default NextAuth(authOptions);

