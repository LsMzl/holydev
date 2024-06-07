"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
   name: string;
   bgColor?: string | null;
   image?: string | null;
   createdAt?: string;
};

export const columns: ColumnDef<Category>[] = [
   {
      accessorKey: "name",
      header: "Nom",
   },
   {
      accessorKey: "image",
      header: "Logo",
   },
   {
      accessorKey: "bgColor",
      header: "color",
   },
   {
      accessorKey: "createdAt",
      header: "Création",
   },
   {
      accessorKey: "action",
      header: "Actions",
      cell: () => {
         return (
            <div className="flex items-center gap-1">
               <Button>Editer</Button>
               <Button className="bg-red-500 text-white">Supprimer</Button>
            </div>
         );
      },
   },
];
