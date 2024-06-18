
import { DataTable } from "@/components/admin/DataTable";
import PageTitle from "@/components/admin/PageTitle";
import { columns } from "@/components/admin/data-tables/UserColumns";
import { getAllUsers } from "@/queries/getAllUsers";
import React from "react";

export default async function DashboardUsers() {
   const data: any = await getAllUsers();
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Utilisateurs" />
         <DataTable columns={columns} data={data} />
      </div>
   );
}
