import { auth } from "@/auth";
import PageContainer from "@/components/layout/page-container";
import { DataTable } from "@/components/tables/flight-tables/data-table";
import { Suspense } from "react";
import { getFlightLogs } from "@/lib/actions/flightlog.action";
import { columns } from "@/components/tables/flight-tables/columns";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CreateFlightLogDialog } from "@/components/forms/CreateFlightLogDialog";
import { Toaster } from "sonner";

const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];

export default async function Dashboard() {
  const user = await auth();
  const { flightLogs, totalCount } = await getFlightLogs();

  return (
    <PageContainer scrollable={true}>
      <Toaster />
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Welcome, {user?.user?.name ?? "Pilot"}! 👋
          </h2>
          <CreateFlightLogDialog />
        </div>

        <Separator className="my-6" />

        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="space-y-4">
          <Heading
            title={`Flight Logs (${totalCount})`}
            description="Manage your flight logs efficiently"
          />

          <Suspense fallback={<div>Loading flight logs...</div>}>
            <DataTable columns={columns} data={flightLogs} />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
}
