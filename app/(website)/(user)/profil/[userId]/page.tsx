import Container from "@/components/elements/Container";
import Image from "next/image";
import React from "react";
import Banner from "@/public/img/banniere.jpg";
import { CameraIcon, Eye } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import BiographyPopUpForm from "@/components/forms/user/BiographyPopUpForm";
import SettingsMenu from "@/components/user/profile/SettingsMenu";
import UpdateProfileForm from "@/components/user/profile/UpdateProfileForm";
import { cn } from "@/lib/utils";

interface ProfilPageProps {
   params: {
      userId: string;
   };
   userId: string;
}
const page = async ({ params, userId }: ProfilPageProps) => {
   const user = await getUserByClerkId(params.userId);
   

   return (
      <div className="flex justify-center">
         <Container className="max-w-7xl">
            {/* Cover picture & informations */}
            <section>
               {/* Cover picture */}
               <div className="h-[200px] lg:h-[400px] relative group">
                  <Image
                     src={user?.coverPicture ? user?.coverPicture : Banner}
                     fill
                     className="object-cover rounded-b-md"
                     alt=""
                  />
                  <Button className="absolute z-10 items-center gap-2 right-1 bottom-1 hidden group-hover:flex">
                     <CameraIcon size={20} />
                     Changer de photo
                  </Button>
               </div>

               <div className="flex justify-between items-start mx-10 h-28 border-b mb-2">
                  <div className="flex items-end relative -top-10 gap-2">
                     {/* Avatar */}
                     <Avatar className="bg-gray-400 w-24 h-24 md:w-36 md:h-36 border-4 border-background">
                        <AvatarImage
                           className="object-cover"
                           src={
                              user?.profilePicture
                                 ? user?.profilePicture
                                 : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.email}`
                           }
                        />ù
                     </Avatar>
                     {/* Name, Hashtag */}
                     <div className="flex flex-col items-start pb-6">
                        <p className="font-semibold text-3xl capitalize">
                           {user?.firstName} {user?.lastName}
                        </p>
                        <p>@{user?.pseudo}</p>
                     </div>
                  </div>
                  {/* Menu 1 */}
                  <div className="flex mt-2 items-center gap-2 ">
                     <Link
                        href="/mes-annonces"
                        className={cn(
                           buttonVariants(),
                           "flex gap-1 font-semibold"
                        )}
                        title="Annonces utilisateur"
                     >
                        <Eye size={15} /> Mes annonces
                     </Link>
                     <UpdateProfileForm
                        biography={user?.biography ?? ""}
                        avatar={user?.profilePicture ?? ""}
                        email={user?.email ?? ""}
                        coverPicture={user?.coverPicture ?? ""}
                        inscriptionDate={user?.createdAt}
                     />
                     <SettingsMenu />
                  </div>
               </div>
               <div className="mb-10 text-sm mx-10">guofehgodisjg</div>

               {/* Menu 2 */}
            </section>

            <section className="flex gap-5 mb-28 sticky top-0 self-start">
               <aside className="w-[25%] flex flex-col gap-5 ">
                  <div className="border flex items-center justify-center text-center rounded m-auto bg-card w-full">
                     <span className="w-28 hover:bg-border/70 py-2 border-r border-border">
                        <p className="font-semibold leading-5">50</p>
                        <p className="text-sm">Relations</p>
                     </span>
                     <Link
                        href="/mes-annonces"
                        className="w-28 hover:bg-border/70 py-2 border-r border-border"
                        title="Annonces utilisateur"
                     >
                        <p className="font-semibold leading-5">3</p>
                        <p className="text-sm">Annonces</p>
                     </Link>
                     <span className="w-28 hover:bg-border/70 py-2">
                        <p className="font-semibold leading-5">157</p>
                        <p className="text-sm">Avis</p>
                     </span>
                  </div>
                  <div className="border rounded-lg shadow-sm bg-card w-full p-3 flex flex-col gap-3">
                     {/* Biographie */}
                     <div>
                        <p className="font-semibold mb-2">Biographie</p>
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
                        <p className="font-semibold mb-2">Centres d'intêrets</p>
                        <p className="text-sm">{user?.interests}</p>
                     </div>
                     {/* Langues parlées */}
                     <div>
                        <p className="font-semibold mb-2">Langues parlées</p>
                        <p className="text-sm">{user?.languages}</p>
                     </div>
                  </div>

                  {/* Connexions */}
                  <div className="border rounded-lg shadow-sm bg-card p-3">
                     <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Mes connexions</p>
                        <p className="text-sm text-cyan-500">Voir tout</p>
                     </div>
                     <div className="bg-secondary h-96"></div>
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
      </div>
   );
};

export default page;
