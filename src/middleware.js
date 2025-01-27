import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import AddUserInfo from "./app/pages/AddUserInfo/page";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const signInUrl = new URL("/pages/signIn", req.url);
  const homeUrl = new URL("/", req.url);

  if (!token) {
    if (req.nextUrl.pathname !== "/pages/signIn") {
      return NextResponse.redirect(signInUrl);
    }
  } else {
    if (req.nextUrl.pathname === "/pages/signIn") {
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/","/pages/Analytics", "/pages/signIn","/pages/AddUserInfo","/pages/Card","/pages/Transactions"],
};
