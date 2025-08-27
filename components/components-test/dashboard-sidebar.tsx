"use client";

import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/components-test/dashboard-nav-main";
import { NavProjects } from "@/components/components-test/dashboard-nav-projects";
import { NavUser } from "@/components/components-test/dashboard-nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Computei",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Tab",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
  ],
  projects: [],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher teams={data.teams} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
