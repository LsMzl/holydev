import Container from "@/components/elements/Container";
import Image from "next/image";
import React from "react";
import Banner from "@/public/img/banniere.jpg";
import { CameraIcon, Eye, MessageSquareText, UserPlus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import BiographyPopUpForm from "@/components/user/profile/BiographyPopUpForm";
import SettingsMenu from "@/components/user/profile/SettingsMenu";
import UpdateProfileForm from "@/components/user/profile/UpdateProfileForm";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getUserByPseudo } from "@/actions/getUserByPseudo";

interface ProfilPageProps {
   params: {
      userPseudo: string;
   };
   userId: string;
}
const UserProfile = async ({ params }: ProfilPageProps) => {
   const user = await getUserByPseudo(params.userPseudo);
   if (!user) return null;

   return (
      <div className="">
         <div className="bg-gradient-to-b from-gray-500 to-background">
            {/* Haut */}
            <div className="max-w-[1400px] m-auto">
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
                  </div>

                  <div className="flex justify-between items-start mx-2 md:mx-10 h-16 md:h-20 2xl:h-28 md:border-b md:mb-2">
                     <div className="flex items-end relative -top-10 gap-2 ">
                        {/* Avatar */}
                        <Avatar className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-24 h-24 2xl:w-[140px] 2xl:h-[140px] shadow">
                           <AvatarImage
                              className="object-cover rounded-full w-[88px] h-[88px]  2xl:w-[132px] 2xl:h-[132px] absolute bottom-1 right-1"
                              src={
                                 user?.profilePicture
                                    ? user?.profilePicture
                                    : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.email}`
                              }
                           />
                        </Avatar>
                        {/* Name, Hashtag */}
                        <div className="flex flex-col items-start pb-2 2xl:pb-6">
                           <div className="flex items-center gap-2">
                              <p className="font-semibold text-xl 2xl:text-3xl capitalize">
                                 {user?.firstName} {user?.lastName}
                              </p>
                              {user?.isOwner && (
                                 <Badge variant="success">Propriétaire</Badge>
                              )}
                           </div>
                           <p className="text-xs md:text-md">@{user?.pseudo}</p>
                        </div>
                     </div>

                     {/* Menu Buttons Screen */}
                     <div className=" mt-2 items-center gap-2 hidden md:flex ">
                        <Link
                           href={`/user/${user?.pseudo}/annonces`}
                           className={cn(
                              buttonVariants(),
                              "flex gap-1 font-semibold"
                           )}
                           title="Annonces utilisateur"
                        >
                           <Eye size={15} />
                           Annonces
                        </Link>
                        <Button
                           variant="secondary"
                           className="flex items-center gap-1"
                        >
                           <UserPlus size={20} />
                           S'abonner
                        </Button>
                        <Button
                           variant="secondary"
                           className="flex items-center gap-1"
                        >
                           <MessageSquareText size={20} />
                           Contacter
                        </Button>
                     </div>
                  </div>
                  {/* Menu Buttons Mobile */}
                  <div className="items-center flex justify-between mx-2 md:hidden border-b pb-5">
                     <Link
                        href={`/user/${user?.pseudo}/annonces`}
                        className={cn(
                           buttonVariants(),
                           "flex gap-1 font-semibold"
                        )}
                        title="Annonces utilisateur"
                     >
                        <Eye size={15} />
                        Annonces
                     </Link>
                     <Button
                        variant="secondary"
                        className="flex items-center gap-1"
                     >
                        <UserPlus size={20} />
                        S'abonner
                     </Button>
                     <Button
                        variant="secondary"
                        className="flex items-center gap-1"
                     >
                        <MessageSquareText size={20} />
                        Contacter
                     </Button>
                  </div>
                  <div className="mb-10 text-sm mx-2 md:mx-10">
                     guofehgodisjg
                  </div>
               </section>
            </div>
         </div>

         {/* Bas */}
         <Container className="max-w-[1400px]">
            <section className="md:flex gap-5 mb-28 sticky top-0 self-start">
               <aside className="hidden w-[25%] md:flex flex-col gap-5 ">
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
                        {user?.houses.length === 0 && (
                           <>
                              <p className="font-semibold leading-5">0</p>
                              <p className="text-sm">Annonce</p>
                           </>
                        )}
                        {user?.houses.length === 1 && (
                           <>
                              <p className="font-semibold leading-5">
                                 {user?.houses.length}
                              </p>
                              <p className="text-sm">Annonce</p>
                           </>
                        )}
                        {user?.houses.length > 1 && (
                           <>
                              <p className="font-semibold leading-5">
                                 {user?.houses.length}
                              </p>
                              <p className="text-sm">Annonces</p>
                           </>
                        )}
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
                        <p className="text-sm leading-4">
                           {user?.biography ? (
                              user?.biography
                           ) : (
                              <p className="text-xs">
                                 {user.firstName} n'a pas encore renseigné de
                                 biographie
                              </p>
                           )}
                        </p>
                     </div>
                     {/* Centres d'intêrets */}
                     <div>
                        <p className="font-semibold mb-2">Centres d'intêrets</p>
                        <p className="text-sm">
                           {user?.interests ? (
                              user?.interests
                           ) : (
                              <p className="text-xs">
                                 {user.firstName} n'a pas encore renseigné de
                                 centres d'interêts
                              </p>
                           )}
                        </p>
                     </div>
                     {/* Langues parlées */}
                     <div>
                        <p className="font-semibold mb-2">Langues parlées</p>
                        <p className="text-sm">
                           {user?.languages ? (
                              user?.languages
                           ) : (
                              <p className="text-xs">
                                 {user.firstName} n'a pas encore renseigné de
                                 langues parlées
                              </p>
                           )}
                        </p>
                     </div>
                  </div>

                  {/* Connexions */}
                  <div className="border rounded-lg shadow-sm bg-card p-3">
                     <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Connexions</p>
                        <p className="text-sm text-cyan-500">Voir tout</p>
                     </div>
                     <div className="bg-secondary h-96"></div>
                  </div>
               </aside>
               <div className="w-[100%] md:w-[75%] flex flex-col gap-5">
                  {/* Publications */}
                  <div>
                     <p className="text-xl text-medium bg-card rounded-lg border h-[500px]">
                        Publications
                     </p>
                  </div>
               </div>
            </section>
         </Container>
      </div>
   );
};

export default UserProfile;
