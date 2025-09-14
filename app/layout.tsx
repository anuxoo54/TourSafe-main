"use client";

import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import './globals.css'
import { usePathname } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname() || '';
  const hideNavbar = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up') || pathname === '/admin-dashboard';

  // Also hide navbar/footer on admin login page
  const hideOnAdminLogin = pathname === '/sign-in' && pathname.includes('admin-login');

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased flex flex-col min-h-screen`}>
          {!(hideNavbar || hideOnAdminLogin) && <Navbar />}
          <main className="flex-grow">
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}
