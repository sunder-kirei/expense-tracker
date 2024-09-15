import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth && !req.nextUrl.pathname.includes("/signin")) {
    const newUrl = new URL(`/signin?callback=${req.url}`, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
