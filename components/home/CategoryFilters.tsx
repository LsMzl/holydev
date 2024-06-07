import React from "react";
import Container from "../elements/Container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const CategoryFilters = () => {
   return (
      <Container className="flex items-center justify-start text-sm font-semibold gap-3">
         <Button size="sm" className="shadow">
            Tout
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Maison
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Villa
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Appartement
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Chalet
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Campagne
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Montagne
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Studio
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Piscine
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Ferme
         </Button>
         <Button variant="secondary" size="sm" className="shadow">
            Luxe
         </Button>
         <Button variant="link" className="rounded-full p-2 shadow bg-gray-500">
            <ChevronRight />
         </Button>
      </Container>
   );
};

export default CategoryFilters;
