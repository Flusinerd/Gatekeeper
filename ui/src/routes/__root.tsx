import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import PocketBase from 'pocketbase'

type RouterContext = {
  pb: PocketBase
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ThemeProvider storageKey="gatekeeper-ui-theme">
      <SidebarProvider>
        <Outlet></Outlet>
      </SidebarProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </ThemeProvider>
  ),
})
