import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "./lib/auth/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*", "/api/:path*"],
};
