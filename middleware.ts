import { auth } from "@/auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Check if the current path is under any protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );

  const isKnownRoute =
    isPublicRoute || isProtectedRoute || isAuthRoute || isApiAuthRoute;

  // If the route is not known, return a 404
  if (!isKnownRoute) {
    return;
  }

  // If it's an API auth route, we don't need to check for authentication
  if (isApiAuthRoute) {
    return;
  }

  // If it's an auth route
  if (isAuthRoute) {
    // If the user is logged in, redirect to the default login redirect, else return
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return;
    }
  }

  // If it's not a public route and the user is not logged in, redirect to the login page
  if (!isPublicRoute && !isLoggedIn) {
    // Save the current URL to redirect back to after logging in
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    callbackUrl = encodeURIComponent(callbackUrl); // Encode the URL

    return NextResponse.redirect(
      new URL(authRoutes[0] + `?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
