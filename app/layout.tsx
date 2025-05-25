import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ToasterProvider } from '@/components/ui/use-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Math Snap Solver',
  description: 'Snap it. Solve it. Understand it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-background to-background/95`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider>
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-50 w-full bg-secondary/5 backdrop-blur-xl border-b border-border/50">
                <div className="container flex h-16 items-center">
                  <div className="flex flex-1 items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl font-bold text-primary animate-pulse">Math Snap Solver ✨</h1>
                      <p className="text-sm text-muted-foreground">Snap It. Solve It. Understand It.</p>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex flex-1 flex-col">
                <div className="container mx-auto py-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {children}
                  </div>
                </div>
              </main>
              <footer className="mt-auto bg-secondary/5 p-4 text-center text-muted-foreground border-t border-border/50">
                <p className="text-sm">© 2025 Math Snap Solver. All rights reserved.</p>
              </footer>
            </div>
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
