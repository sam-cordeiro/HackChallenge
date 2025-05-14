import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Check-in Dia D Carreiras - COTEMIG",
  description: "Sistema de check-in para o evento Dia D Carreiras do Colégio COTEMIG",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
          defer
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --bs-primary: #40AA0B;
            --bs-primary-rgb: 64, 170, 11;
            --bs-secondary: #822adb;
            --bs-secondary-rgb: 130, 42, 219;
            --bs-dark: #111111;
            --bs-dark-rgb: 17, 17, 17;
          }
          .btn-primary {
            background-color: #40AA0B;
            border-color: #40AA0B;
          }
          .btn-primary:hover, .btn-primary:focus, .btn-primary:active {
            background-color: #348f09 !important;
            border-color: #348f09 !important;
          }
          .btn-outline-secondary {
            color: #822adb;
            border-color: #822adb;
          }
          .btn-outline-secondary:hover, .btn-outline-secondary:focus, .btn-outline-secondary:active {
            background-color: #822adb !important;
            border-color: #822adb !important;
          }
          .bg-primary {
            background-color: #40AA0B !important;
          }
          .text-primary {
            color: #40AA0B !important;
          }
          .text-secondary {
            color: #822adb !important;
          }
          .card-header.bg-primary {
            background-color: #40AA0B !important;
          }
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link href="/" className="navbar-brand fw-bold">
              Dia D Carreiras COTEMIG
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    Início
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/checkin" className="nav-link">
                    Check-in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin" className="nav-link">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-light py-4 mt-5">
          <div className="container text-center">
            <p className="mb-0">&copy; 2023 Colégio COTEMIG - Dia D Carreiras</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
