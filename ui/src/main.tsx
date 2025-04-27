import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import PocketBase from 'pocketbase'
import { PocketbaseProvider } from './hooks/usePocketbase.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Pocketbase is proxied under /api
const pocketbaseHost = window.location.origin
const pb = new PocketBase(pocketbaseHost)

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    pb,
    queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PocketbaseProvider client={pb}>
          <RouterProvider router={router} />
        </PocketbaseProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
