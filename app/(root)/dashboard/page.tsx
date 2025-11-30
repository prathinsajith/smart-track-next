"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTableGeneric } from "@/components/data-table-generic";
import { dashboardColumns, DashboardItem } from "./columns";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json";
import { useAuthStore } from "@/stores/auth-store";
import { useGreeting } from "@/hooks/useGreeting";

export default function Page() {
  const { user } = useAuthStore();
  const greeting = useGreeting();
  const name = user?.fullName || "User";

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="px-4 lg:px-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {greeting}, <span className="text-primary">{name}</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Here's what's happening with your projects today.
        </p>
      </div>

      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="px-4 lg:px-6">
        <DataTableGeneric
          columns={dashboardColumns}
          data={data as DashboardItem[]}
          searchKey="header"
          searchPlaceholder="Search by header..."
          showColumnVisibility={true}
          showPagination={true}
          pageSize={10}
        />
      </div>
    </div>
  );
}
