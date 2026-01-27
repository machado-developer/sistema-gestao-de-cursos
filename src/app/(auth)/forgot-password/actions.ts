'use server'

import { prisma } from "@/lib/prisma"
import { MailService } from "@/services/mailService"
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

export async function forgotPassword(email: string) {
    if (!email) return { error: 'E-mail é obrigatório' }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        // Por segurança, não confirmamos se o email existe ou não
        return { success: 'Se este e-mail estiver registado, receberá instruções para redefinir a sua senha.' }
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hora

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExpires: expires
        }
    })

    const result = await MailService.sendPasswordResetEmail(email, token)

    if (!result.success) {
        return { error: 'Erro ao enviar e-mail. Tente novamente mais tarde.' }
    }

    return { success: 'Se este e-mail estiver registado, receberá instruções para redefinir a sua senha.' }
}

export async function resetPassword(token: string, newPassword: string) {
    if (!token || !newPassword) return { error: 'Dados inválidos' }

    const user = await prisma.user.findUnique({
        where: { resetToken: token }
    })

    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
        return { error: 'Token inválido ou expirado' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null
        }
    })

    return { success: 'Senha redefinida com sucesso! Agora pode fazer login.' }
}
