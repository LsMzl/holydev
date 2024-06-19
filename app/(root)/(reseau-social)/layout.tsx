import type { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import Spacing from "@/components/elements/Spacing";
import SocialSideNav from "@/components/navigation/SocialSideNav";

export const metadata: Metadata = {
   title: "Holydevs",
   description: "Le réseau social de l'immobilier",
};

export default async function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");

   return (
      <div className="flex w-full min-h-screen gap-10">
         <div className="lg:w-[20%] 2xl:w-[15%]">
            <SocialSideNav
               userMail={connectedUser?.email}
               userAvatar={connectedUser?.profilePicture}
               userFirstName={connectedUser?.firstName}
               userLastName={connectedUser?.lastName}
               username={connectedUser?.pseudo}
               userId={connectedUser?.clerkId}
            />
         </div>
         <div className="w-[100%] lg:w-[80%] 2xl:w-[60%] mx-auto">
            <Spacing size="xs" />
            {children}
         </div>
      </div>
   );
}
