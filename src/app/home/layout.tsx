'use client'

import { ChakraProvider } from '@chakra-ui/react'
import './globals.css'
import { Provider } from '@/_components/lib/ui/provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}

