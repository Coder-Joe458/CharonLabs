import type { Metadata } from 'next'
import { Inter, Lalezar, Inria_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })
const lalezar = Lalezar({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lalezar',
})
const inriaSans = Inria_Sans({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-inria-sans',
})

export const metadata: Metadata = {
  title: 'CHARON - Raise from users, manage on-chain',
  description: 'CHARON - Raise from users, manage on-chain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lalezar.variable} ${inriaSans.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

