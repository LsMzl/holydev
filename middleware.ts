import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type {NextRequest} from "next/server";

const isProtectedRoutes = createRouteMatcher([
  // "/api(.*)",
  // "/book-house",
  // "/dashboard",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoutes(req)) {
    auth().protect();
  }
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };
  
