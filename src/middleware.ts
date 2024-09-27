import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyToken } from "./common/utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env["COOKIE_NAME"]!)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  const isVerified = await verifyToken(token);
  if (!isVerified) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
}

export const config = {
  matcher: ["/api/user/:path*"],
};
