import { auth } from "@/auth";
import PageContainer from "@/components/layout/page-container";
import { DataTable } from "@/components/tables/user-tables/data-table";
import { Suspense } from "react";
import { getUsers } from "@/lib/actions/user.action";
import { columns } from "@/components/tables/user-tables/columns";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CreateUserDialog } from "@/components/forms/CreateUserDialog";
import { Toaster } from "sonner";
import { AlertDestructive } from "@/components/alert-icon";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/dashboard/users" },
];

export default async function Dashboard() {
  const user = await auth();
  if (user?.user.role !== "admin") {
    return (
      <div className="p-10">
        <AlertDestructive />
      </div>
    );
  }
  const { users, totalCount } = await getUsers();
  return (
    <PageContainer scrollable={true}>
      <Toaster />
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Users Management
          </h2>
          <CreateUserDialog />
        </div>

        <Separator className="my-6" />

        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="space-y-4">
          <Heading
            title={`Users (${totalCount})`}
            description="Manage application users"
          />

          <Suspense fallback={<div>Loading users...</div>}>
            <DataTable columns={columns} data={users} />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
}
