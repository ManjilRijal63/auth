import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// auth() here wraps our middleware with session reading ability
export default auth((req) => {
  // req.auth contains the session — null if not logged in
  const session = req.auth;

  // Get the path the user is trying to visit
  const { pathname } = req.nextUrl;

  // ============================================
  // RULE 1: Protected routes — must be logged in
  // ============================================
  // If someone tries to visit /dashboard without being logged in
  // redirect them to /login
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    // Build the redirect URL — send them to /login
    const redirectUrl = new URL("/login", req.nextUrl.origin);
    // Also remember where they were trying to go
    // so after login we can send them there automatically
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // ============================================
  // RULE 2: Admin routes — must be ADMIN role
  // ============================================
  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute) {
    // Not logged in at all → go to login
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    // Logged in but not ADMIN → go to dashboard
    // (they're authenticated but not authorized)
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  // ============================================
  // RULE 3: Auth pages — redirect if already logged in
  // ============================================
  // If someone is already logged in and tries to visit /login or /register
  // just send them to dashboard — they don't need to login again
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  // If none of the rules triggered — let the request through normally
  return NextResponse.next();
});

// This tells Next.js WHICH routes this middleware runs on
// Without this, middleware would run on EVERY file including
// images, fonts, api routes etc — which would be slow and wrong
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api/auth (Auth.js needs these to work freely)
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization)
     * - favicon.ico
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};