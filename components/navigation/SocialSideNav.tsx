"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "../ui/design-system/Typography";

import { cn } from "@/lib/utils";
import LocationFilter from "./LocationFilter";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Calendar, Handshake, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import MiniMap from "../user/MiniMap";

interface SideNavProps {
   className?: string;
   title: string;
   label?: string;
   icon: LucideIcon;
   variant: "default" | "ghost";
   href: string;
}

type sideNavUserInfosProps = {
   userMail: string | undefined;
   userAvatar: string | undefined | null;
   userFirstName: string | undefined | null;
   userLastName: string | undefined | null;
   username: string | undefined | null;
   userId: string | undefined | null;
};

const sideNavLinks: SideNavProps[] = [
   {
      title: "Mes amis",
      icon: Handshake,
      variant: "ghost",
      href: "/mes-annonces",
   },
   {
      title: "Réservations",
      icon: Calendar,
      variant: "ghost",
      href: "/mes-reservations",
   },
   {
      title: "Favoris",
      icon: Calendar,
      variant: "ghost",
      href: "/mes-reservations",
   },
   {
      title: "Favoris",
      icon: Calendar,
      variant: "ghost",
      href: "/mes-reservations",
   },
];

const SocialSideNav = ({
   userMail,
   userAvatar,
   userFirstName,
   userLastName,
   username,
   userId,
}: sideNavUserInfosProps) => {
   const pathname = usePathname();

   const { user } = useUser();

   return (
      <aside
         className={cn(
            "hidden lg:block py-2 static top-0 left-0 h-screen pt-16 ml-2"
         )}
      >
         {/* User infos */}
         <section className="mb-5">
            <div className="text-center mb-5">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-28 w-28 relative left-[50%] -translate-x-[50%] drop-shadow-lg mb-2">
                  <Link href={`/profil/${userId}`} title="Profil utilisateur">
                     <AvatarImage
                        className="object-cover"
                        src={
                           userAvatar
                              ? userAvatar
                              : `https://api.dicebear.com/8.x/thumbs/svg?seed=${
                                   Math.floor(Math.random() * 100) + 1
                                }`
                        }
                     />
                  </Link>
               </Avatar>
               {userFirstName || userLastName ? (
                  <>
                     <p className="font-semibold capitalize">
                        {userFirstName} {userLastName}
                     </p>
                     <p className="text-sm">{username}</p>
                  </>
               ) : (
                  <>
                     <p className="font-semibold capitalize">Visiteur</p>
                     <p className="text-xs">
                        Connectez-vous pour profiter de toutes les
                        fonctionnalités
                     </p>
                  </>
               )}
            </div>
         </section>

         <section className="rounded p-3 bg-card/30 shadow">
            {/* Links */}
            <div className="flex flex-col gap-1">
               {sideNavLinks.map((link, index) => (
                  <Link
                     key={index}
                     href={link.href}
                     className={cn(
                        buttonVariants({
                           variant:
                              link.href === pathname ? "default" : "ghost",
                           size: "sm",
                        }),
                        link.variant === "default" &&
                           "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start"
                     )}
                  >
                     <link.icon className="mr-2 h-4 w-4" />
                     {link.title}
                     {link.label && (
                        <span
                           className={cn(
                              "ml-auto",
                              link.variant === "default" &&
                                 "text-background dark:text-white"
                           )}
                        >
                           {link.label}
                        </span>
                     )}
                  </Link>
               ))}
            </div>
            <Separator className="my-5" />
            {/* Friends */}
            <div className="flex flex-col gap-1 font-medium">
               <p className="text-sm font-medium mb-3">Discussions récentes</p>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmail`}
                     />
                  </Avatar>
                  <p className="text-xs">Harry Cover</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usgfderEmagfdgfdgfil`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usejrtyhsdhfrEmail`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmajnfgdhtrhrtil`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmjgfdjrtjyail`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
            </div>
         </section>
      </aside>
   );
};

export default SocialSideNav;
