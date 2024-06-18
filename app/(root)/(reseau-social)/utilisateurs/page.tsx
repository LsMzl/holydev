import Spacing from "@/components/elements/Spacing";
import SideNav from "@/components/navigation/SideNav";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Users() {
   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");
   return (
      <div className="flex w-full min-h-screen">
         <div className="lg:w-[20%] 2xl:w-[15%]">
            <SideNav
               userMail={connectedUser?.email}
               userAvatar={connectedUser?.profilePicture}
               userFirstName={connectedUser?.firstName}
               userLastName={connectedUser?.lastName}
               username={connectedUser?.pseudo}
               userId={connectedUser?.clerkId}
            />
         </div>
         <div className="w-[100%] lg:w-[80%] 2xl:w-[85%]">
            <Spacing size="xs" />
         </div>
      </div>
   );
}
