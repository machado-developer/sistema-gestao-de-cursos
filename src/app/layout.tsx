import './globals.css'
import type { Metadata } from 'next'
import NextAuthSessionProvider from '@/providers/SessionProvider'
import { Toaster } from 'sonner'
import { LanguageProvider } from "@/lib/i18n/LanguageContext"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: 'Gestão Académica PRO',
  description: 'Sistema Profissional de Gestão De cursos',
}

import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased min-h-screen text-zinc-50 selection:bg-blue-500/30" style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#09090B' }}>
        <NextAuthSessionProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Toaster position="top-right" />
              <Suspense fallback={null}>
                {children}
              </Suspense>
            </ThemeProvider>
          </LanguageProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
