"use client";
import { useState } from "react";

// Types

import { OnboardingStepsListInterface } from "@/types/houseOnboardingTypes";

// Components
import OnboardingView from "./HouseOnboarding.view";
import FirstStep from "./steps/FirstStep";
import LastStep from "./steps/LastStep";
import { Category, Feature } from "@prisma/client";

interface HouseOnboardingProps {
   house: {
      id?: string | undefined | null;
      title?: string | undefined | null;
      intro?: string | undefined | null;
      description?: string | undefined | null;
      country?: string | undefined | null;
      state?: string | undefined | null;
      city?: string | undefined | null;
      address?: string | undefined | null;
   };
   categories: Category[];
   equipements: Feature[];
}


const HouseOnboardingContainer = ({house, categories, equipements}: HouseOnboardingProps) => {
   /** --ETAPES DE L'ONBOARDING-- **/

   const [currentStep, setCurrentStep] = useState<number>(1);

   const stepsList: OnboardingStepsListInterface[] = [
      { id: 1, label: "FirstStep", component: { step: FirstStep } },
      { id: 2, label: "LastStep", component: { step: LastStep } },

   ];

   // Mise en place du système de navigation entre les étapes de l'onboarding
   const getCurrentStep = () => {
      return stepsList.find((step) => step.id === currentStep);
   };

   const nextStep = () => {
      if (currentStep < stepsList.length) {
         setCurrentStep(currentStep + 1);
      }
   };

   const previousStep = () => {
      if (currentStep > 1) {
         setCurrentStep(currentStep - 1);
      }
   };

   const isFirstStep = () => {
      if (currentStep === 1) {
         return true;
      }
      return false;
   };

   const isFinalStep = () => {
      if (currentStep === stepsList.length) {
         return true;
      }
      return false;
   };

   return (
      <OnboardingView
         getCurrentStep={getCurrentStep}
         next={nextStep}
         previous={previousStep}
         isFirstStep={isFirstStep}
         isFinalStep={isFinalStep}
         stepsList={stepsList}
         house={house}
         categories={categories}
         equipements={equipements}
      />
   );
};

export default HouseOnboardingContainer;
