import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'La Corruption Tordue',
  description: 'Encore à des lieues à travers les collines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
