import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { UserAvatarDialog } from "@/components/user-avatar-dialog";
import { NAVBAR_DATA } from "@/lib/constant";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconBell, IconSearch } from "@tabler/icons-react";
import React from "react";
import { User } from "@/stores/auth-store";

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  // Function to generate breadcrumb items
  const getBreadcrumbs = () => {
    const items = [];

    // Find current active item
    for (let item of NAVBAR_DATA.navMain) {
      if (item?.children) {
        const matchedChild = item?.children.find((child) =>
          pathname.startsWith(child.href)
        );
        if (matchedChild) {
          items.push({ title: item.title, href: item.url });
          items.push({ title: matchedChild.title, href: matchedChild.href, isPage: true });
          return items;
        }
      }

      if (item.url === pathname) {
        items.push({ title: item.title, href: item.url, isPage: true });
        return items;
      }
    }

    // Fallback for other pages
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const title = pathSegments[pathSegments.length - 1];
      items.push({
        title: title.charAt(0).toUpperCase() + title.slice(1),
        href: pathname,
        isPage: true
      });
    } else {
      items.push({ title: "Dashboard", href: "/dashboard", isPage: true });
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b border-white/10 bg-background/80 backdrop-blur-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Desktop sidebar trigger - hidden on mobile */}
        <SidebarTrigger className="-ml-1 hidden lg:flex" />

        {/* Mobile sidebar - shown only on mobile */}
        <div className="lg:hidden">
          <MobileSidebar user={user} />
        </div>

        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem className="hidden md:block">
                  {item.isPage ? (
                    <BreadcrumbPage className="font-bold">{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          {/* Search Bar - Visual Only */}
          <div className="relative hidden md:block w-64">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-xl bg-background pl-9 h-9 focus-visible:ring-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <IconBell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <ModeToggle />
            <UserAvatarDialog user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
