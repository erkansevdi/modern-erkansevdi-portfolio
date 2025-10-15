// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  // Eğer admin cookie'si yoksa ve /admin/login'de değilse -> login sayfasına yönlendir
  if (
    !session &&
    req.nextUrl.pathname.startsWith("/admin") &&
    !req.nextUrl.pathname.startsWith("/admin/login")
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Eğer giriş yapılmışsa ve tekrar /login'e gitmeye çalışıyorsa -> admin ana sayfasına yönlendir
  if (
    session &&
    req.nextUrl.pathname.startsWith("/admin/login")
  ) {
    return NextResponse.redirect(new URL("/admin/about", req.url));
  }

  return NextResponse.next();
}

// Bu middleware yalnızca /admin/* rotalarında çalışacak
export const config = {
  matcher: ["/admin/:path*"],
};
