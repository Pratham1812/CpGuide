"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Roboto_Mono, Roboto_Slab } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";
import { CookiesProvider } from "react-cookie";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
const roboto = Roboto_Slab({
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Container-->client component children-->server component
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={roboto.className}>
        <CookiesProvider>
          {" "}
          <SSRProvider>
            <NavBar />
            <Toaster />

            <main>{children}</main>
          </SSRProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
