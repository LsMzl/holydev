import { getHouseById } from "@/queries/getHouseById";
import AddHouseForm from "@/components/forms/house/AddHouseForm";
import { Typography } from "@/components/ui/design-system/Typography";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { getAllCategories } from "@/queries/getAllCategories";
import Container from "@/components/elements/Container";

interface HousePageProps {
   params: {
      annonceId: string;
   };
}

const House = async ({ params }: HousePageProps) => {
   // Check if the house doesn't exist
   const house = await getHouseById(params.annonceId);

   const categories = await getAllCategories();
   // Session user id
   const { userId } = auth();

   if (!userId) {
      return (
         <Typography variant="h3" balise="h2">
            Vous n'êtes pas connecté.
         </Typography>
      );
   }

   if (house && house.ownerId !== userId) {
      return (
         <Typography variant="h3" balise="h2">
            Accès refusé.
         </Typography>
      );
   }

   return (
      <Container>
         <AddHouseForm house={house} categories={categories} />
      </Container>
   );
};

export default House;
