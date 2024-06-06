"use client";
import { DataTable } from "@/components/admin/DataTable";
import PageTitle from "@/components/admin/PageTitle";
import { data } from "@/components/admin/data/userTableData";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export default function DashboardUsers() {
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Utilisateurs" />
         <DataTable columns={columns} data={data} />
      </div>
   );
}

export type User = {
   name: string;
   email: string;
   lastOrder: string;
   method: string;
};

export const columns: ColumnDef<User>[] = [
   {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <img
                  src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${row.getValue(
                     "name"
                  )}`}
                  alt={`Photo de ${row.getValue("name")}`}
                  className="rounded-full h-8 w-8"
               />
               <p>{row.getValue("name")}</p>
            </div>
         );
      },
   },
   {
      accessorKey: "email",
      header: "Email",
   },
   {
      accessorKey: "lastOrder",
      header: "Dernière commande",
   },
   {
      accessorKey: "method",
      header: "Méthode",
   },
];
