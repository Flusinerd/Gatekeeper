import * as React from 'react'
import {
  AudioWaveform,
  Blend,
  BookOpen,
  Bot,
  Command,
  Fingerprint,
  GalleryVerticalEnd,
  ToggleRight,
} from 'lucide-react'

import { NavGroup } from '@/components/nav-main'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { NavUser } from './nav-user'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],

  navRelease: [
    {
      title: 'Flags',
      url: '/flags',
      icon: ToggleRight,
    },
    {
      title: 'Segments',
      url: '#',
      icon: Blend,
    },
    {
      title: 'Contexts',
      url: '#',
      icon: Fingerprint,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={data.navRelease} groupName="Release" />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              avatar: '',
              email: user.email,
              name: user.name ?? '',
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
