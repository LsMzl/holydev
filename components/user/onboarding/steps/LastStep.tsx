import React from "react";
import OnboardingNav from "../navigation/OnboardingNav";
import { ComponentsProps } from "@/types/onboardingTypes";

const LastStep = ({
   next,
   isFirstStep,
   isFinalStep,
   stepsList,
   getCurrentStep,
}: ComponentsProps) => {
   return (
      <section className="flex flex-col items-center">
         <h1 className="text-5xl font-medium mb-3 leading-8">Félicitations !</h1>
         <p className="mb-7 text-center">Vous pouvez à présent profiter pleinement de la plateforme et échanger avec nos membres</p>
         <OnboardingNav
            next={next}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
         />
      </section>
   );
};

export default LastStep;
