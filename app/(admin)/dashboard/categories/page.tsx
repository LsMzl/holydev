import { DataTable } from "@/components/admin/DataTable";
import PageTitle from "@/components/admin/PageTitle";
import { columns } from "@/components/admin/data-tables/CategoryColumns";

import AddCategoryForm from "@/components/admin/forms/AddCategoryForm";
import { getAllCategories } from "@/queries/getAllCategories";
import React from "react";

export default async function Categories() {
   const data = await getAllCategories();
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Catégories" />
         <h3 className="text-xl font-medium">Liste des catégories</h3>
         <DataTable columns={columns} data={data} />
         <h3 className="text-xl font-medium">Ajouter une catégorie</h3>
         <AddCategoryForm />
      </div>
   );
}
