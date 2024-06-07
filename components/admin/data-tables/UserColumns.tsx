"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
   firstName?: string | null;
   lastName?: string;
   email: string;
   phone?: string;
   profilePicture?: string;
   comments?: number;
   house?: number;
   lastOrder: string;
   method: string;
   createdAt?: string;
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
      accessorKey: "createdAt",
      header: "Inscription",
   },
   {
      accessorKey: "house",
      header: "Annonces",
   },
   {
      accessorKey: "comments",
      header: "Commentaires",
   },
   {
      accessorKey: "lastOrder",
      header: "Dernier achat",
   },
   {
      accessorKey: "method",
      header: "Méthode",
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
