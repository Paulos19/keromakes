import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // Protect /dashboard routes — only ADMIN can access
        if (pathname.startsWith("/dashboard")) {
            if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;

                // Dashboard routes require authentication
                if (pathname.startsWith("/dashboard")) {
                    return !!token;
                }

                // All other routes are public
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};
