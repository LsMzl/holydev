import { ComponentsProps } from "@/types/onboardingTypes";

const OnboardingView = ({
   getCurrentStep,
   next,
   previous,
   isFirstStep,
   isFinalStep,
   stepsList,
}: ComponentsProps) => {
   //? Si un composant correspond à l'étape en cours, affichage du composant
   if (getCurrentStep()?.component) {
      const Component = getCurrentStep()?.component.step;

      return (
         <div>
            {Component && (
               <Component
                  getCurrentStep={getCurrentStep}
                  next={next}
                  previous={previous}
                  isFirstStep={isFirstStep}
                  isFinalStep={isFinalStep}
                  stepsList={stepsList}
               />
            )}
         </div>
      );
   }
   //! Pas de composant correspondant à l'étape en cours
   return null;
};

export default OnboardingView;
