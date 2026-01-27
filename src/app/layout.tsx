import './globals.css'
import type { Metadata } from 'next'
import NextAuthSessionProvider from '@/providers/SessionProvider'
import { Toaster } from 'sonner'
import { LanguageProvider } from "@/lib/i18n/LanguageContext"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: {
    default: 'Newtech Gestão',
    template: '%s | Newtech Gestão'
  },
  description: 'Sistema Profissional de Gestão Empresarial - Gestão de Cursos, Formações, Certificados e Recursos Humanos',
  keywords: ['gestão empresarial', 'gestão de cursos', 'formações', 'certificados', 'recursos humanos', 'newtech'],
  authors: [{ name: 'Newtech' }],
  creator: 'Newtech',
  publisher: 'Newtech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://newtech-gestao.com',
    title: 'Newtech Gestão',
    description: 'Sistema Profissional de Gestão Empresarial - Gestão de Cursos, Formações, Certificados e Recursos Humanos',
    siteName: 'Newtech Gestão',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Newtech Gestão - Sistema Profissional de Gestão Empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newtech Gestão',
    description: 'Sistema Profissional de Gestão Empresarial',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
