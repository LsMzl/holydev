import Container from "@/components/elements/Container";
import { getUserById } from "@/queries/getUserById";
import Image from "next/image";
import React from "react";
import House1 from "@/public/img/house1.jpg";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { currentUser } from "@clerk/nextjs/server";

import Link from "next/link";

interface ProfilPageProps {
   params: {
      userId: string;
   };
}
const page = async ({ params }: ProfilPageProps) => {
   const userDb = await getUserById(params.userId);

   const user = await currentUser();
   const userEmail = user?.emailAddresses[0].emailAddress;

   return (
      <Container className="max-w-7xl">
         {/* Cover picture & informations */}
         <section >
            {/* Cover picture */}
            <div className="h-[200px] lg:h-[400px] relative ">
               {/* //TODO Image par défaut si non renseignée */}
               <Image
                  src={House1}
                  fill
                  className="object-cover rounded-b-md"
                  alt=""
               />
            </div>

            <div className="flex justify-between mx-10">
               <div className="flex items-end relative -top-10 gap-2">
                  {/* Avatar */}
                  <Avatar className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 border-4 border-blue-400 drop-shadow-lg">
                     <AvatarImage
                        src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.emailAddresses}`}
                     />
                  </Avatar>
                  {/* Name, Hashtag */}
                  <div className="flex flex-col items-center pb-5">
                     <p className="font-semibold text-3xl">Louis Mazzella</p>
                     <p>@ls_mzl</p>
                  </div>
               </div>
               {/* Menu 1 */}
               <div className="flex mt-2 justify-center gap-2 ">
                  <Button
                     variant="outline"
                     className="uppercase text-foreground"
                  >
                     Modifier mon profil
                  </Button>
                  <Button variant="outline" className="text-foreground">
                     <Settings />
                  </Button>
               </div>
            </div>

            {/* Menu 2 */}
         </section>

         <section className="flex gap-5">
            <aside className="w-[25%] flex flex-col gap-5 ">
               <div className="border flex items-center justify-center text-center rounded m-auto bg-card w-full">
                  <span className="w-28 hover:bg-border/70 py-2 border-r border-border">
                     <p className="font-semibold leading-5">50</p>
                     <p className="text-sm">Relations</p>
                  </span>
                  <span className="w-28 hover:bg-border/70 py-2 border-r border-border">
                     <p className="font-semibold leading-5">3</p>
                     <p className="text-sm">Annonces</p>
                  </span>
                  <span className="w-28 hover:bg-border/70 py-2">
                     <p className="font-semibold leading-5">157</p>
                     <p className="text-sm">Avis</p>
                  </span>
               </div>
               <div className="border rounded bg-card w-full p-2">
                <p className="text-sm font-medium">Mes connexions</p>

               </div>
            </aside>
            <div className="w-[75%]  bg-blue-300">ghdfh</div>
         </section>
      </Container>
   );
};

export default page;
