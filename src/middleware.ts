import { User } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const user = token?.user as User;

    const response = NextResponse.next();
    response.headers.set("Authorization", `Bearer ${user.token}`);
    return response;
  },
  {
    pages: {
      signIn: "/signup",
    },
    callbacks: {
      authorized: async ({ token }) => {
        if (token) {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/parties/:path*"],
};
