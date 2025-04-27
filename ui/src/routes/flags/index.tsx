import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flags/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/flags/"!</div>
}
