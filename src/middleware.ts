import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Middleware implementation
export default withAuth(
    function middleware(req) {
        // You can add custom logic here, e.g. role checks
        // req.nextauth.token is available
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Return true if valid token exists
        },
        pages: {
            signIn: '/login', // Redirect specific
        }
    }
)

export const config = {
    // Protect all routes under / but exclude login, api/auth, and static assets
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - login (public login page)
         * - api/auth (auth api routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public folder for images etc if used in root)
         */
        '/((?!login|forgot-password|reset-password|api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
}
