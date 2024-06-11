'use client'
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

/** Empeche les utilisateurs d'accéder à l'onboarding s'ils l'ont complété. */
export const preventOnboarding = (clerkId: string, databaseId: string, onboardingCompleted: boolean) => {
    const pathname = usePathname();

    if(!clerkId) {
        console.log("pas de userId => bloqué")
        // router.push('/)
    } else if (clerkId) {
        console.log("userId trouvé => accès")
    } else if (clerkId && clerkId === databaseId && onboardingCompleted === false) {
        console.log("onboarding pas terminé => accès")
    } else {
        console.log("onboarding terminé => bloqué")
        // router.push('/')
    }


};