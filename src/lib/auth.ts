import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("[AUTH] Missing credentials")
                    return null
                }

                console.log(`[AUTH] Attempting login for: ${credentials.email}`)

                try {
                    console.log(`[AUTH] Querying user in database...`)
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: {
                            profile: {
                                include: {
                                    permissions: {
                                        include: { module: true }
                                    },
                                    itemPermissions: {
                                        include: { moduleItem: true }
                                    }
                                }
                            },
                            permissions: {
                                include: { module: true }
                            },
                            itemPermissions: {
                                include: { moduleItem: true }
                            },
                            funcionario: {
                                include: {
                                    documentos: {
                                        where: { tipo: 'Foto' },
                                        orderBy: { createdAt: 'desc' },
                                        take: 1
                                    }
                                }
                            }
                        }
                    })
                    console.log(`[AUTH] Query finished. User found: ${!!user}`)

                    if (!user) {
                        console.log(`[AUTH] User not found: ${credentials.email}`)
                        return null
                    }

                    console.log(`[AUTH] Validating password for: ${user.email}`)
                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if (!isValid) {
                        console.log(`[AUTH] Invalid password for: ${user.email}`)
                        return null
                    }

                    console.log(`[AUTH] Login successful for: ${user.email}`)

                    // Mesclar permissões do perfil com as específicas do usuário (overrides)
                    const permsMap = new Map<string, any>()
                    const itemPermsMap = new Map<string, any>()

                    // 1. Permissões do Perfil
                    user.profile?.permissions.forEach(p => {
                        permsMap.set(p.module.key, {
                            key: p.module.key,
                            canRead: p.canRead,
                            canWrite: p.canWrite
                        })
                    })
                    user.profile?.itemPermissions.forEach(p => {
                        itemPermsMap.set(p.moduleItem.key, {
                            key: p.moduleItem.key,
                            canRead: p.canRead,
                            canWrite: p.canWrite
                        })
                    })

                    // 2. Overrides do Usuário
                    user.permissions.forEach(p => {
                        permsMap.set(p.module.key, {
                            key: p.module.key,
                            canRead: p.canRead,
                            canWrite: p.canWrite
                        })
                    })
                    user.itemPermissions.forEach(p => {
                        itemPermsMap.set(p.moduleItem.key, {
                            key: p.moduleItem.key,
                            canRead: p.canRead,
                            canWrite: p.canWrite
                        })
                    })

                    // 3. Admin sempre tem acesso total
                    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN_ROOT') {
                        permsMap.set('*', { key: '*', canRead: true, canWrite: true })
                        itemPermsMap.set('*', { key: '*', canRead: true, canWrite: true })
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isRoot: user.isSystemRoot || user.role === 'SUPER_ADMIN_ROOT',
                        permissions: Array.from(permsMap.values()),
                        itemPermissions: Array.from(itemPermsMap.values()),
                        image: user.funcionario?.documentos[0]?.url || null
                    }
                } catch (error: any) {
                    console.error(`[AUTH] DATABASE ERROR:`, error.message || error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login', // Custom login page
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
                token.isRoot = user.isRoot
                token.permissions = user.permissions
                token.itemPermissions = user.itemPermissions
                token.image = user.image
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role
                session.user.isRoot = token.isRoot
                session.user.permissions = token.permissions
                session.user.itemPermissions = token.itemPermissions
                session.user.image = token.image
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
    }
}
