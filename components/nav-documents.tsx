"use client";

import * as TablerIcons from "@tabler/icons-react";
import { IconFolder, IconShare3, IconTrash } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { NAVBAR_DATA } from "@/lib/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon?: string;
    children?: object[];
  }[];
}) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  // ✔ Move the function inside component
  const getActiveGroupLabel = () => {
    for (let item of NAVBAR_DATA.navMain) {
      if (item.children) {
        const matchedChild = item.children.find((child) =>
          pathname.startsWith(child.href)
        );
        if (matchedChild) return `${item.title} → ${matchedChild.title}`;
      }

      if (item.url === pathname) return item.title;
    }

    return "Page";
  };

  const activeGroupLabel = getActiveGroupLabel(); // ✔ compute dynamically

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{activeGroupLabel}</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const IconComponent = item.icon
            ? (TablerIcons as any)[item.icon]
            : null;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {IconComponent && <IconComponent />}
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
