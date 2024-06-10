"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell, Pen, Plus, Search } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const TopNav = () => {
   const { userId } = useAuth();
   const router = useRouter();
   return (
      <nav className="flex items-center justify-between py-2 px-2 lg:px-5 mb-2 sticky top-0 left-0 z-50 bg-background">
         <Link href="/" className="text-md" title="Retour à la page d'accueil">
            <div className="flex items-center gap-2 ">
               <Image
                  src={Logo}
                  width={60}
                  height={60}
                  alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                  className="hidden sm:block"
               />
               <p className="hidden lg:block text-red-500 uppercase font-semibold text-lg">
                  Holydevs
               </p>
            </div>
         </Link>

         <div className="flex justify-between items-center w-[1515px] gap-5">
            <div className="flex items-center gap-2">
               <Image
                  src={Logo}
                  width={40}
                  height={50}
                  alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                  className="sm:hidden"
               />
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
               {/* Tablet */}
               <Input
                  className="hidden sm:block md:w-[300px] ml-4"
                  placeholder="Recherchez une annonce, ville, catégorie..."
               />
            </div>

            <div className="flex items-center justify-between gap-3 md:gap-5">
               {/* Mobile */}
               <Button className="md:hidden" size="sm">
                  <Pen size={15} />
               </Button>

               <div className="relative">
                  <Bell size={20} />
                  <span className="absolute h-4 w-4 rounded-full bg-red-500 -top-1 -right-1"></span>
               </div>

               <Button
                  className="hidden md:flex items-center gap-1 shadow "
                  onClick={() => router.push("/annonce/ajouter")}
               >
                  <Plus size={15} />
                  Créer une annonce
               </Button>
               <div className="relative hidden">
                  <Bell />
                  <span className="absolute h-4 w-4 rounded-full bg-red-500 -top-1 -right-1"></span>
               </div>
               {userId ? <UserMenu /> : <GuestMenu />}
            </div>
         </div>
      </nav>
   );
};

export default TopNav;
