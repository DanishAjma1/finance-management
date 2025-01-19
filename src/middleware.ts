import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token");

  if (!token && req.nextUrl.pathname !== "/signIn") {
    const signInUrl = new URL("/pages/signIn", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/pages/AddUserInfo", "/", "/pages/signUp"],
};
