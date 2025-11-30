"use client";

import * as React from "react";
import {

  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NAVBAR_DATA } from "@/lib/constant";
import { User } from "@/stores/auth-store";

const data = NAVBAR_DATA;

interface MainSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function MainSidebar({
  user,
  ...props
}: MainSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border/40" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" aria-label="Acme Inc. Homepage">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Main navigation">
          <NavMain items={data.navMain} />
        </nav>
        <nav aria-label="Secondary navigation" className="mt-auto">
          <NavSecondary items={data.navSecondary} />
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
