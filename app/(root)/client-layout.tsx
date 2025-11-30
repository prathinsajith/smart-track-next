"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MainSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useInitializeAuth } from "@/hooks/useInitializeAuth";
import { useAuthStore } from "@/stores/auth-store";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useInitializeAuth(); // runs only on browser

  const user = useAuthStore((state) => state.user);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="hidden lg:block">
        <MainSidebar user={user} variant="inset" />
      </div>

      <SidebarInset className="lg:ml-0">
        <Header user={user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 px-4">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
