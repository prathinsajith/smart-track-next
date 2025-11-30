"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconMenu2,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NAVBAR_DATA } from "@/lib/constant";

import { User } from "@/stores/auth-store";

interface MobileSidebarProps {
  user: User | null;
}
const data = NAVBAR_DATA;

export function MobileSidebar({ user }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <IconMenu2 className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <div className="flex h-full flex-col">
          <SidebarHeader className="border-b p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                >
                  <a href="#" aria-label="Acme Inc. Homepage">
                    <IconInnerShadowTop className="!size-5" />
                    <span className="text-base font-semibold">Acme Inc.</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="flex-1 p-4">
            <nav aria-label="Main navigation">
              <NavMain items={data.navMain} />
            </nav>
            <nav aria-label="Secondary navigation" className="mt-auto">
              <NavSecondary items={data.navSecondary} />
            </nav>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <NavUser user={user} />
          </SidebarFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
