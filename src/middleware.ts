// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/profile"] }

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     // console.log(req.nextauth.token)
//     // console.log(req.nextUrl)
//     const { token } = req.nextauth;
//     const { pathname, origin } = req.nextUrl;

//     if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
//       return NextResponse.redirect(`${origin}/unauthorized`);
//     }
//   },
//   {
//     callbacks: {
//       // If `authorized` returns `true`, the middleware function will execute.
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiRoutePrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // all users are allowed to access /api/auth routes
  if (isApiRoutePrefix) {
    return;
  }
  // and then check auth routes and if logged in
  //   redirect user to the default login redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // if user is not logged in and not on a public route (which means user is on protected route)
  //    redirect user to login page to force login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return;
});

// paths in here is simply going to be used to invoke the middleware
// so /profile will invoke the middleware callback function above
// below matcher is from clerk
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
