import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect both user-profile and dashboard routes
const isProtectedRoute = createRouteMatcher([
  "/user-profile(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    "/__clerk/:path*",
  
    "/(api|trpc)(.*)",
  ],
};