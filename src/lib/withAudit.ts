import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from './audit'

type AuditOptions = {
    acao: string
    entidade: string
}

export function withAudit(
    handler: (req: NextRequest, context?: any) => Promise<NextResponse>,
    options: AuditOptions
) {
    return async (req: NextRequest, context?: any) => {
        try {
            // We call the handler first
            const response = await handler(req, context)

            // Only log if the response is successful (200-299)
            // and it's a mutation request
            if (response.ok && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
                await createAuditLog({
                    acao: `${req.method} ${options.acao}`,
                    entidade: options.entidade,
                    detalhes: {
                        url: req.nextUrl.pathname,
                        method: req.method,
                        // If we had a way to access the body here without consuming it, we'd add it.
                        // For now logging the intent and outcome is the baseline.
                    }
                })
            }

            return response
        } catch (error) {
            // We don't log errors here as the handler should handle them
            // or the global error handler will take over.
            throw error
        }
    }
}
