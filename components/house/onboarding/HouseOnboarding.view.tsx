import { ComponentsProps } from "@/types/houseOnboardingTypes";

const HouseOnboardingView = ({
   getCurrentStep,
   next,
   previous,
   isFirstStep,
   isFinalStep,
   stepsList,
   house,
   categories,
   equipements,
   types
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
                  house={house}
                  categories={categories}
                  equipements={equipements}
                  types={types}
               />
            )}
         </div>
      );
   }
   //! Pas de composant correspondant à l'étape en cours
   return null;
};

export default HouseOnboardingView;
