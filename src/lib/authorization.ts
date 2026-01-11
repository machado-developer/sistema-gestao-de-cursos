import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * Require specific role(s) to access a route
 */
export async function requireRole(allowedRoles: string[]) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error('Não autenticado')
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! }
    })

    if (!user || !allowedRoles.includes(user.role)) {
        throw new Error('Acesso negado - permissão insuficiente')
    }

    return { session, user }
}

/**
 * Check if user is an instrutor assigned to a specific turma
 */
export async function requireInstrutor(turmaId: string) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error('Não autenticado')
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! }
    })

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    // Admin has access to everything
    if (user.role === 'ADMIN') {
        return { session, user, isAdmin: true }
    }

    // Find instrutor by email
    const instrutor = await prisma.instrutor.findUnique({
        where: { email: user.email }
    })

    if (!instrutor) {
        throw new Error('Instrutor não encontrado')
    }

    // Check if instrutor is assigned to this turma
    const turma = await prisma.turma.findFirst({
        where: {
            id: turmaId,
            instrutorId: instrutor.id
        }
    })

    if (!turma) {
        throw new Error('Acesso negado - você não é o instrutor desta turma')
    }

    return { session, user, instrutor, isAdmin: false }
}

/**
 * Get current user's instrutor record (if exists)
 */
export async function getCurrentInstrutor() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return null
    }

    const instrutor = await prisma.instrutor.findUnique({
        where: { email: session.user.email! }
    })

    return instrutor
}

/**
 * Check if current user is admin
 */
export async function isAdmin() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return false
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! }
    })

    return user?.role === 'ADMIN'
}
