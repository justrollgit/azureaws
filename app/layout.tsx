import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AWS to Azure Transition Platform',
  description: 'Learn Azure cloud services with your existing AWS knowledge',
  keywords: ['AWS', 'Azure', 'cloud computing', 'certification', 'learning'],
  authors: [{ name: 'AWS to Azure Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}