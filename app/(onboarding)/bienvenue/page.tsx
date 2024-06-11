import OnboardingContainer from "@/components/user/onboarding/Onboarding.container";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

export default async function Onboarding() {
   const { userId } = auth();
   const user = await getUserByClerkId(userId ?? "");

   //? Pas de clerkId || onboarding complété
   if (
      !userId ||
      (userId &&
         userId === user?.clerkId &&
         user?.isOnboardingCompleted === true)
   ) {
      redirect("/");
   //? Onboarding non complété
   } else {
      return (
         <div>
            <OnboardingContainer />
         </div>
      );
   }
}
