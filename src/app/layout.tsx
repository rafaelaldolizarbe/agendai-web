import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { KeycloakProvider } from '@/components/providers/KeycloakProvider'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgendAI',
  description: 'Gestão inteligente para salões de beleza',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <KeycloakProvider>
          {children}
        </KeycloakProvider>
      </body>
    </html>
  )
}
