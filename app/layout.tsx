import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Space² | The Operating System for Space-Embodied Intelligence',
  description: 'From Digital Ether to Mars Honeycombs. The OS for the awakened space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
