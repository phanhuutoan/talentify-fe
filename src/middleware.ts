import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/auth/", "/_next/", "/favicon.ico"];
const specialPages = [/^\/landing$/, /^\/$/, /\/blog\/?.*/];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const currentPath = url.pathname;
  const authData = req.cookies.get("auth"); // For cookies
  const isPublicPage = publicPages.some((page) => currentPath.startsWith(page));
  const isSpecialPageMatch = specialPages.some((page) =>
    page.test(currentPath),
  );
  let isAuth = !!authData;

  if (authData) {
    const authInfo = JSON.parse(authData.value) as {
      token: string;
      expiredAt: string;
    };
    const expiredAt = new Date(authInfo.expiredAt);
    const now = new Date();
    isAuth = now < expiredAt && !!authInfo.token;
  }

  // User able to go here no matter they're auth or not
  if (isSpecialPageMatch) {
    return NextResponse.next();
  }

  if (isPublicPage && !isAuth) {
    return NextResponse.next();
  }

  if (!isAuth) {
    url.pathname = "/auth/login";
    req.cookies.delete("auth");
    return NextResponse.redirect(url);
  }

  if (isAuth && isPublicPage) {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
