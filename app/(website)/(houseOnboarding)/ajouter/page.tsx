import { getAllFeatures } from "@/actions/getAllFeatures";
import HouseOnboardingContainer from "@/components/house/onboarding/HouseOnboarding.container";
import { getAllCategories } from "@/queries/getAllCategories";
import { Category, Feature, House } from "@prisma/client";
import React from "react";

interface HouseOnboardingProps {
   house: House | null;
  //  categories: Category[];
  //  equipements: Feature[];
}

export default async function AddHouse({ house }: HouseOnboardingProps) {
   const categories = await getAllCategories();
   const equipements = await getAllFeatures();

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
      <HouseOnboardingContainer
         house={houseData}
         categories={categories}
         equipements={equipements}
      />
   );
}
