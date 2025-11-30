"use client";

import * as TablerIcons from "@tabler/icons-react";
import Link from "next/link";
import { NavItem } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: NavItem[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const IconComponent = item.icon
              ? (TablerIcons as any)[item.icon]
              : null;

            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={isActive
                    ? "bg-blue-50 text-primary font-semibold hover:bg-blue-50 hover:text-primary"
                    : "text-gray-600 font-medium hover:text-primary hover:bg-gray-50"
                  }
                >
                  <Link href={item.url}>
                    {IconComponent && <IconComponent className={isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"} />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
