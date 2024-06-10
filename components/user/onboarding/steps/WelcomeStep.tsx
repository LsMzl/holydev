import React from "react";
import OnboardingNav from "../navigation/OnboardingNav";
import { ComponentsProps } from "@/types/onboardingTypes";

const WelcomeStep = ({
   next,
   isFirstStep,
   isFinalStep,
   stepsList,
   getCurrentStep,
}: ComponentsProps) => {
   return (
      <section className="w-full h-screen flex items-center justify-center">
         <div className="flex flex-col justify-center items-center">
            <h1 className=" text-3xl md:text-5xl lg:text-6xl font-medium text-center">
               Bienvenue sur Holydevs !
            </h1>
            <p className="mb-5">Le réseau social entre propriétaires</p>
            <OnboardingNav
               next={next}
               isFirstStep={isFirstStep}
               isFinalStep={isFinalStep}
            />
         </div>
      </section>
   );
};

export default WelcomeStep;
