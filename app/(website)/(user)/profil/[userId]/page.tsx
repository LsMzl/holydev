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
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import BiographyPopUpForm from "@/components/forms/user/BiographyPopUpForm";

interface ProfilPageProps {
   params: {
      userId: string;
   };
}
const page = async ({ params }: ProfilPageProps) => {
   const user = await getUserByClerkId(params.userId);

   return (
      <Container className="max-w-7xl mx-auto">
         {/* Cover picture & informations */}
         <section>
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
                  <Avatar className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 border-2 border-blue-400 drop-shadow-lg">
                     <AvatarImage
                        className="object-cover"
                        src={
                           user?.profilePicture
                              ? user?.profilePicture
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.email}`
                        }
                     />
                  </Avatar>
                  {/* Name, Hashtag */}
                  <div className="flex flex-col items-start pb-5">
                     <p className="font-semibold text-3xl">
                        {user?.firstName} {user?.lastName}
                     </p>
                     <p>@{user?.pseudo}</p>
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
               <div className="border rounded bg-card w-full p-3 flex flex-col gap-3">
                  {/* Biographie */}
                  <div>
                     <p className="font-medium mb-2">Biographie</p>
                     {/* //TODO: Bio ou bouton ajouter biographie */}
                     <p className="text-sm leading-4">
                        {user?.biography ? (
                           user?.biography
                        ) : (
                           <BiographyPopUpForm />
                        )}
                     </p>
                  </div>
                  {/* Centres d'intêrets */}
                  <div>
                     <p className="font-medium mb-2">Centres d'intêrets</p>
                     <p className="text-sm">{user?.interests}</p>
                  </div>
                  {/* Langues parlées */}
                  <div>
                     <p className="font-medium mb-2">Langues parlées</p>
                     <p className="text-sm">{user?.languages}</p>
                  </div>
                  {/* Connexions */}
                  <div>
                     <p className="font-medium">Mes connexions</p>
                  </div>
               </div>
            </aside>
            <div className="w-[75%] flex flex-col gap-5">
               <div className="bg-card rounded border h-24">ghdfh</div>
               {/* Publications */}
               <div>
                  <p className="text-xl text-medium bg-card rounded border h-24">
                     Publications
                  </p>
               </div>
            </div>
         </section>
      </Container>
   );
};

export default page;
