import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/context/ThemeContext"

export const metadata: Metadata = {
  title: "Titan Quantum Trading | Where Data Meets Dominance",
  description:
    "Titan Quantum Trading engineers alpha through precision, data, and disciplined execution across global equities, options, and digital asset markets.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-[130px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
