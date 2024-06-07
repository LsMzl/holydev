"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Equipment = {
   name: string;
   image?: string | null;
   createdAt?: string;
};

export const columns: ColumnDef<Equipment>[] = [
   {
      accessorKey: "name",
      header: "Nom",
   },
   {
      accessorKey: "image",
      header: "Logo",
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
            <div className="flex items-center gap-2">
               <Button>
                  <Pen className="h-4 w-4 mr-2" />
                  Editer
               </Button>
               <Button className="bg-red-500 text-white">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
               </Button>
            </div>
         );
      },
   },
];
