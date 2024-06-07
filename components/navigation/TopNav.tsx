"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell, Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";

const TopNav = () => {
   const { userId } = useAuth();
   const router = useRouter();
   return (
      <nav className="flex items-center justify-between py-2 px-8 mb-2 sticky top-0 left-0 z-50 bg-background">
         <Link href="/" className="text-md" title="Retour à la page d'accueil">
            <div className="flex items-center gap-2 text-red-500 uppercase font-semibold text-lg">
               <Image
                  src={Logo}
                  width={50}
                  height={50}
                  alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
               />
               Holydevs
            </div>
         </Link>

         <div className="flex justify-between items-center w-[1500px]">
            <Input
               className="max-w-[500px]"
               placeholder="Recherchez une annonce, ville, catégorie..."
            />
            <div className="flex items-center justify-between gap-10">
               <Button
                  className="flex items-center gap-1 shadow"
                  onClick={() => router.push("/annonce/ajouter")}
               >
                  <Plus size={15} />
                  Créer une annonce
               </Button>
               <div className="relative">
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
