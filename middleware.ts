import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (token) {
    console.log("User is authenticated:", token);
  } else {
    console.log("User is not authenticated");
  }

  // Define protected routes
  const protectedPaths = ["/payment"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  console.log(`Protected path check: ${isProtectedPath}`);

  // Redirect to login if accessing protected route without being authenticated
  if (!token && isProtectedPath) {
    console.log("Redirecting to login...");

    const url = new URL("/auth/login", req.url);
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    url.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(url);
  }

  // Continue with the request
  return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
  }
  
}

export const config = {
  matcher: "/payment/:path*",
};
