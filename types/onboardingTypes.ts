export interface ComponentsProps {
   /**- Retourne l'objet de type onboardingStepsListInterface correspondant à l'étape en cours.*/
   getCurrentStep: () => OnboardingStepsListInterface | undefined;
   next: () => void;
   previous: () => void;
   isFirstStep: () => boolean;
   isFinalStep: () => boolean;
   user: {
      id?: string | undefined | null;
      email?: string | undefined | null;
      password?: boolean | undefined | null;
      phone?: string | undefined | null;
      image?: string | undefined | null;
   };
   dbUser : {
      id?: string | undefined | null;
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
      interests?: string | undefined | null;
      password?: string | undefined | null;
      email?: string | undefined | null;
   }
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
