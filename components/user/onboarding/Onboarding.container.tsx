"use client";
import { useState } from "react";

// Types
import { OnboardingStepsListInterface } from "@/types/onboardingTypes";

// Components
import WelcomeStep from "./steps/WelcomeStep";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import LastStep from "./steps/LastStep";
import OnboardingView from "./Onboarding.view";

interface OnboardingProps {
   user: {
      id?: string;
      email?: string;
      password?: boolean;
      phone?: string | null | undefined;
      image?: string;
   };
   dbUser: {
      id?: string | undefined;
      firstName?: string | undefined | null;
      lastName?: string | undefined | null;
      pseudo?: string | undefined | null;
      phone?: string | undefined | null;
      profilePicture?: string | undefined | null;
      country?: string | undefined | null;
      state?: string | undefined | null;
      address?: string | undefined | null;
      biography?: string | undefined | null;
      languages?: string | undefined | null;
      password?: string | undefined | null;
      email?: string | undefined | null;
   };
}

const OnboardingContainer = ({ user, dbUser }: OnboardingProps) => {
   /** --ETAPES DE L'ONBOARDING-- **/

   const [currentStep, setCurrentStep] = useState<number>(1);

   const stepsList: OnboardingStepsListInterface[] = [
      { id: 1, label: "Welcome", component: { step: WelcomeStep } },
      { id: 2, label: "FirstStep", component: { step: FirstStep } },
      { id: 3, label: "SecondStep", component: { step: SecondStep } },
      { id: 4, label: "LastStep", component: { step: LastStep } },
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
         user={user}
         dbUser={dbUser}
      />
   );
};

export default OnboardingContainer;
