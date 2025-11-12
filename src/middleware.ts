import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/app") ||
    req.nextUrl.pathname.startsWith("/send");

  if (isProtectedRoute || isAuthPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/send/:path*", "/auth"],
};
