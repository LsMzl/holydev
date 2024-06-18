import { getAllFeatures } from "@/actions/getAllFeatures";
import LastStep from "@/components/forms/house/add-house/LastStep";
import { getAllCategories } from "@/queries/getAllCategories";
import { getAllHouseTypes } from "@/queries/getAllHouseTypes";
import { getHouseById } from "@/queries/getHouseById";
import { ComponentsProps } from "@/types/houseOnboardingTypes";
import React from "react";

interface AddHouseProps {
   params: {
      houseId: string;
   };
}

export default async function AddHouseLastStep({ params }: AddHouseProps) {
   const house = await getHouseById(params.houseId);
   const categories = await getAllCategories();
   const equipements = await getAllFeatures();
   const types = await getAllHouseTypes();

   const houseData = {
      id: house?.id,
      title: house?.title,
      intro: house?.introduction,
      description: house?.description,
      country: house?.country,
      state: house?.state,
      city: house?.city,
      address: house?.address,
   };

   return (
      <LastStep
         house={houseData}
         categories={categories}
         equipements={equipements}
         types={types}
      />
   );
}
