"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Bell, Home, LayoutGrid, Pen, Plus, Search, Users } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Spacing from "../elements/Spacing";
import { cn } from "@/lib/utils";

interface UserMenuProps {
   userMail: string;
   userAvatar: string;
   userClerkId: string;
   firstname: string;
   lastname: string;
}

const TopNav = ({
   userMail,
   userAvatar,
   userClerkId,
   firstname,
   lastname,
}: UserMenuProps) => {
   const { userId } = useAuth();
   const router = useRouter();
   return (
      <nav className="flex items-center justify-between py-1 fixed w-full top-0 left-0 z-50 bg-background/10 shadow 2xl:relative">
         <div className="lg:w-[20%] 2xl:w-[15%] flex items-center justify-center">
            <Link
               href="/"
               className="text-md "
               title="Retour à la page d'accueil"
            >
               <div className="flex items-center gap-2">
                  <Image
                     src={Logo}
                     width={40}
                     height={40}
                     alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                     className="hidden sm:block"
                  />
                  <p className="hidden lg:block text-red-500 uppercase font-semibold text-lg">
                     Holydevs
                  </p>
               </div>
            </Link>
         </div>

         <div className="flex justify-between items-center gap-5 w-[100%] lg:w-[80%] 2xl:w-[85%] pr-2">
            <div className="flex items-center gap-2">
               <Link href="/" title="Retour à la page d'accueil">
                  <Image
                     src={Logo}
                     width={40}
                     height={50}
                     alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                     className="sm:hidden"
                  />
               </Link>
               {/* Search Bar */}
               {/* Mobile */}
               <div className="sm:hidden">
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button variant="outline" className="rounded-full p-2">
                           <Search size={20} />
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="p-0">
                        <Input placeholder="Recherchez une annonce, ville, catégorie..." />
                     </PopoverContent>
                  </Popover>
               </div>
               {/* Onglets */}
               <div className="flex items-center">
                  <Link
                     href="/"
                     className="hover:bg-secondary py-3 px-8 rounded"
                     title="Accueil"
                  >
                     <Home />
                  </Link>
                  <Link
                     href="/utilisateurs"
                     className="hover:bg-secondary py-3 px-8 rounded"
                     title="Utilisateurs"
                  >
                     <Users />
                  </Link>
                  <Link
                     href="/social"
                     className="hover:bg-secondary py-3 px-8 rounded"
                     title="Social"
                  >
                     <LayoutGrid />
                  </Link>
               </div>
               {/* Tablet */}
               <label htmlFor="searchBar" />
               <Input
                  className="hidden sm:block md:w-[300px] md:absolute md:left-[50%] md:translate-x-[-50%] 2xl:w-[500px]"
                  placeholder="Recherchez une annonce, ville, catégorie..."
                  name="searchBar"
                  id="searchBar"
               />
            </div>

            <div className="flex items-center justify-between gap-3 md:gap-5">
               {/* Mobile */}
               {userId && (
                  <Button className="md:hidden" size="sm">
                     <Pen size={15} />
                  </Button>
               )}
               {/* Screen */}
               {userId && (
                  <Link
                     href="/ajouter"
                     className={cn(
                        buttonVariants(),
                        "hidden md:flex items-center gap-1 shadow "
                     )}
                  >
                     <Plus size={15} />
                     Annonce
                  </Link>
               )}

               <div className="relative md:ml-5">
                  <Bell size={20} />
                  <span className="absolute h-4 w-4 rounded-full bg-red-500 -top-1 -right-1"></span>
               </div>

               {userId ? (
                  <UserMenu
                     userMail={userMail}
                     userClerkId={userClerkId}
                     userAvatar={userAvatar}
                     firstname={firstname}
                     lastname={lastname}
                  />
               ) : (
                  <GuestMenu />
               )}
            </div>
         </div>
      </nav>
   );
};

export default TopNav;
