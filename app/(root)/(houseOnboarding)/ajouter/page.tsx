import FirstStep from "@/components/forms/house/add-house/FirstStep";
import { ComponentsProps } from "@/types/houseOnboardingTypes";
import React from "react";

export default async function AddHouseFirstStep({ house }: ComponentsProps) {

   
   return <FirstStep house={house} />;
}
