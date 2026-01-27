import './globals.css'
import type { Metadata } from 'next'
import NextAuthSessionProvider from '@/providers/SessionProvider'
import { Toaster } from 'sonner'
import { LanguageProvider } from "@/lib/i18n/LanguageContext"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: 'Newtech Gestão',
  description: 'Sistema Profissional de Gestão Empresarial',
}

import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <NextAuthSessionProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Toaster position="top-right" richColors expand={true} closeButton />
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
