import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type ReactQueryProviderProps = {
  children: React.ReactNode
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
