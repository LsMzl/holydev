import { Category, Feature } from "@prisma/client";

export interface ComponentsProps {
   /**- Retourne l'objet de type onboardingStepsListInterface correspondant à l'étape en cours.*/
   getCurrentStep: () => OnboardingStepsListInterface | undefined;
   next: () => void;
   previous: () => void;
   isFirstStep: () => boolean;
   isFinalStep: () => boolean;
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
   categories: Category[],
   equipements: Feature[]

   /**- Retourne un tableau d'objets de type onboardingStepsListInterface correspondant à l'ensemble des étapes.*/
   stepsList: OnboardingStepsListInterface[];
}

/**- Types des objets composants le tableau stepsList.
 * - id: number
 * - label: string
 * - component: { step: React.ComponentType<BaseComponentProps> }
 */
export interface OnboardingStepsListInterface {
   id: number;
   label: string;
   component: { step: React.ComponentType<ComponentsProps> };
}
