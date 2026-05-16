import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hasValidAdminAuthorization } from "./lib/adminAuth";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="KOI Admin", charset="UTF-8"',
    },
  });
}

export function middleware(request: NextRequest) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return new NextResponse("ADMIN_PASSWORD is not configured.", {
      status: 503,
    });
  }

  if (!hasValidAdminAuthorization(request.headers.get("authorization"))) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
