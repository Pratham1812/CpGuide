"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'
import { Container, SSRProvider } from '@/components/bootstrap';
import { CookiesProvider } from "react-cookie";
import NavBar from '@/components/NavBar'
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Gallery',
  description: 'First next proj',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Container-->client component children-->server component
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>        <SSRProvider>
<NavBar/>
<Toaster/>
          <main>
      <Container className='py-4'>
      {children}
      </Container>
</main>
      </SSRProvider>
      </CookiesProvider>

      </body>
    </html>
  )
}
