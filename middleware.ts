import { auth } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  if (!req.auth && !req.nextUrl.pathname.includes("/signin")) {
    const newUrl = new URL(`/signin?callback=${req.url}`, req.nextUrl.origin);
    console.log("redirect ");
    return Response.redirect(newUrl);
  }
});
