import { redirect } from "next/navigation";

/**
 * Redirige l'utilisateur vers l'onboarding si celui-ci n'est pas complété.
 * @param clerkId String - Identifiant de clerk.
 * @param databaseId String - Identifiant clerk dans la base de données.
 * @param onboardingCompleted - Colonne dans la base de données indiquant si l'onboarding est terminé ou non.
 * @returns
 */
export const shouldRedirectToOnboarding = (
   clerkId: string,
   databaseId: string,
   onboardingCompleted: boolean
) => {
   //? Si invité
   if (!clerkId) {
      return;
      //? Si utilisateur connu dans la database et onboarding terminé
   } else if (
      clerkId &&
      clerkId === databaseId &&
      onboardingCompleted === true
   ) {
      return;
   } else {
      redirect("/bienvenue");
   }
};


