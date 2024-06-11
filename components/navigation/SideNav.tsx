"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "../ui/design-system/Typography";

import { cn } from "@/lib/utils";
import LocationFilter from "./LocationFilter";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Calendar, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";

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
};

const sideNavLinks: SideNavProps[] = [
   {
      title: "Mes annonces",
      icon: Calendar,
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

const SideNav = ({
   userMail,
   userAvatar,
   userFirstName,
   userLastName,
   username,
}: sideNavUserInfosProps) => {
   const pathname = usePathname();

   const { user } = useUser();

   return (
      <aside
         className={cn(
            "hidden lg:block px-5 py-2 sticky top-[72px] self-start w-[350px] ml-3 bg-slate-500"
         )}
      >
         {/* User infos */}
         <section className="mb-5">
            <div className="text-center mb-5">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-20 w-20 relative left-[50%] -translate-x-[50%] border-2 border-red-600">
                  <AvatarImage
                     className="object-cover"
                     src={
                        userAvatar
                           ? userAvatar
                           : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userMail}`
                     }
                  />
               </Avatar>
               <p className="font-semibold capitalize">{userFirstName} {userLastName}</p>
               <p className="text-sm">{username}</p>
            </div>
            {/* Followers */}
            <div className="rounded flex py-2 px-2 xl:px-5 text-xs justify-between bg-card">
               <span className="flex flex-col items-center justify-center">
                  <p className="text-sm font-bold">127</p>
                  <p className="font-medium">Abonnés</p>
               </span>
               <span className="flex flex-col items-center justify-center">
                  <p className="text-sm font-bold">54</p>
                  <p className="font-medium">Likes</p>
               </span>
               <span className="flex flex-col items-center justify-center">
                  <p className="text-sm font-bold">547</p>
                  <p className="font-medium">Vues</p>
               </span>
            </div>
         </section>

         <section className="rounded p-3 bg-card">
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
            {/* Filters */}
            <Separator className="my-5" />
            <LocationFilter />
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

export default SideNav;
