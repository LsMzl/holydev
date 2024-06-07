import React from "react";
import Container from "../elements/Container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { getAllCategories } from "@/queries/getAllCategories";
import { v4 as uuidv4 } from "uuid";

const CategoryFilters = async () => {
   const categories = await getAllCategories();
   return (
      <Container className="flex items-center justify-start text-sm font-semibold gap-3">
         <Button size="sm" className="shadow">
            Tout
         </Button>
         {categories.map((category) => (
            <Button variant="secondary" size="sm" className="shadow" key={uuidv4()}>
               {category.name}
            </Button>
         ))}
         <Button variant="link" className="rounded-full p-2 shadow bg-gray-500">
            <ChevronRight />
         </Button>
      </Container>
   );
};

export default CategoryFilters;
