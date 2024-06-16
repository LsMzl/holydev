import OnboardingContainer from "@/components/user/onboarding/Onboarding.container";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";
/* Récupération des infos user clerk
currentUser @clerk/nextjs

const user = await currentUser()

const userData = {
   id: user?.id,
   mail: user.mail
   etc...
}

<OnboardingContainer user={userData}/>


*/

export default async function Onboarding() {
   const { userId } = auth();

   const user = await getUserByClerkId(userId ?? "");
   const dbUserData = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      pseudo: user?.pseudo,
      phone: user?.phone,
      profilePicture: user?.profilePicture,
      country: user?.country,
      state: user?.state,
      address: user?.address,
      biography: user?.biography,
      languages: user?.languages,
      interests: user?.interests,
      isOnboardingCompleted: user?.isOnboardingCompleted,
      clerkId: user?.clerkId,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      password: user?.password,
      email: user?.email,
   };

   const clerkUser = await currentUser();
   const userData = {
      id: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
      password: clerkUser?.passwordEnabled,
      image: clerkUser?.imageUrl,
      // etc...
   };

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
            <OnboardingContainer user={userData} dbUser={dbUserData} />
         </div>
      );
   }
}
