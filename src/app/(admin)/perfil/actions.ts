'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function updatePassword(formData: any) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return { error: 'Não autorizado' }
    }

    const { currentPassword, newPassword, confirmPassword } = formData

    if (newPassword !== confirmPassword) {
        return { error: 'A nova senha e a confirmação não coincidem' }
    }

    if (newPassword.length < 6) {
        return { error: 'A nova senha deve ter pelo menos 6 caracteres' }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) {
        return { error: 'Usuário não encontrado' }
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordMatch) {
        return { error: 'A senha atual está incorreta' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: { email: session.user.email },
        data: { password: hashedPassword }
    })

    return { success: 'Senha atualizada com sucesso!' }
}

export async function getUserProfile() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return null

    let user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            funcionario: {
                include: {
                    cargo: true,
                    departamento: true,
                    documentos: {
                        where: { tipo: 'Foto' },
                        take: 1
                    }
                }
            }
        }
    })

    // Se o usuário não tem vínculo de funcionário, vamos tentar vincular ou criar um básico
    if (user && !user.funcionario) {
        // 1. Tentar encontrar um funcionário com o mesmo email que não esteja vinculado
        const existingFunc = await prisma.funcionario.findFirst({
            where: {
                email: user.email,
                userId: null
            }
        })

        if (existingFunc) {
            await prisma.funcionario.update({
                where: { id: existingFunc.id },
                data: { userId: user.id }
            })
        } else {
            // 2. Criar um perfil básico de funcionário para permitir upload de foto e outros dados
            // Usamos o ID do usuário no BI para garantir unicidade se não houver um real
            await prisma.funcionario.create({
                data: {
                    nome: user.name,
                    email: user.email,
                    bi_documento: `USR-${user.id.slice(0, 8)}`,
                    data_admissao: new Date(),
                    userId: user.id,
                    status: 'ATIVO'
                }
            })
        }

        // Recarregar o usuário com o novo vínculo
        user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                funcionario: {
                    include: {
                        cargo: true,
                        departamento: true,
                        documentos: {
                            where: { tipo: 'Foto' },
                            take: 1
                        }
                    }
                }
            }
        })
    }

    return user
}
