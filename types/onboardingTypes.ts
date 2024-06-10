export interface ComponentsProps {
   /**- Retourne l'objet de type onboardingStepsListInterface correspondant à l'étape en cours.*/
   getCurrentStep: () =>OnboardingStepsListInterface | undefined;
   next: () => void;
   previous: () => void;
   isFirstStep: () => boolean;
   isFinalStep: () => boolean;
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
