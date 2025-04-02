import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware() {
  // const isLogin = true;
  // if (!isLogin) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ["/dashboard", "/profile", "/login", "/register"]);

// export const config = {
//   matcher: ["/product/:path*", "/about/:path*"],
// };
