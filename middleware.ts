import createIntlMiddleware from "next-intl/middleware";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {routing} from "./i18n/routing";
import {hasValidAdminAuthorization} from "./lib/adminAuth";

const intlMiddleware = createIntlMiddleware(routing);

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="KOI Admin", charset="UTF-8"',
    },
  });
}

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (isAdminPath(pathname)) {
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

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/admin/:path*", "/api/admin/:path*"],
};
