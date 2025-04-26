import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider storageKey="gatekeeper-ui-theme">
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
})
