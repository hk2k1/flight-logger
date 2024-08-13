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
  runtime: "nodejs",
  unstable_allowDynamic: [
    // allows a single file
    "/src/db/lib/dbConnect.js",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/mongoose/dist/**",
    // allows a single file
    "/lib/utilities.js",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/function-bind/**",
  ],
};
