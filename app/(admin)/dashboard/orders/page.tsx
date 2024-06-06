"use client";
import { DataTable } from "@/components/admin/DataTable";
import PageTitle from "@/components/admin/PageTitle";
import { data } from "@/components/admin/data/orderTableData";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export default function DashboardReservations() {
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Réservations" />
         <DataTable columns={columns} data={data} />
      </div>
   );
}

export type Order = {
   order: string;
   status: string;
   method: string;
   date: string;
};

export const columns: ColumnDef<Order>[] = [
   {
      accessorKey: "order",
      header: "Réservations",
   },
   {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
         return (
            <div className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
               "bg-red-200": row.getValue("status") === "Pending",
               "bg-orange-200": row.getValue("status") === "Processing",
               "bg-green-200": row.getValue("status") === "Completed",
            })}>
               {row.getValue("status")}
            </div>
         );
      },
   },
   {
      accessorKey: "method",
      header: "Méthode",
   },
   {
      accessorKey: "date",
      header: "Date",
   },
];
