import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { hasPermission } from "./lib/rbac"

// Map URL prefixes to Module Keys
const ROUTE_MODULE_MAP: Record<string, string> = {
    '/cursos': 'gestao_cursos',
    '/turmas': 'gestao_cursos',
    '/alunos': 'gestao_cursos',
    '/matriculas': 'gestao_cursos',
    '/academico': 'gestao_cursos',
    '/financeiro': 'financeiro_mod',
    '/rh': 'rh_mod',
    '/configuracoes': 'sistema',
    '/audit': 'sistema',
};

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // Find the module key for the current route
        const routePrefix = Object.keys(ROUTE_MODULE_MAP).find(prefix => pathname.startsWith(prefix));

        if (routePrefix && token) {
            const moduleKey = ROUTE_MODULE_MAP[routePrefix];
            const permissions = token.permissions as any[];
            const role = token.role as string;

            // Admin always has access
            if (role === 'ADMIN') return NextResponse.next();

            // Check if user has at least read permission for this module
            if (!hasPermission(permissions, moduleKey, 'read')) {
                // Se não tem permissão para o módulo, volta para a home que decidirá o que mostrar
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/login',
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
