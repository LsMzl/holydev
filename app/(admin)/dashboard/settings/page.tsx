"use client";
import { DataTable } from "@/components/admin/DataTable";
import PageTitle from "@/components/admin/PageTitle";
import { data } from "@/components/admin/data/settingsData";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export default function DashboardSettings() {
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Options" />
         <DataTable columns={columns} data={data} />
      </div>
   );
}

export interface Setting {
   category: string;
   value: string | number | boolean;
}

export const columns: ColumnDef<Setting>[] = [
   {
      accessorKey: "category",
      header: "Catégorie",
   },

   {
      accessorKey: "value",
      header: "Valeur",
   },
];
