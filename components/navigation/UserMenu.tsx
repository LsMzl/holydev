"use client";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

import Link from "next/link";


import { SignOutButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "../provider/theme/ThemeToggle";
import { UserAvatar } from "../utils/UserAvatar";

export function UserMenu() {
   const { user } = useUser();
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               className="py-5 px-1 rounded-full drop-shadow-md"
               size="lg"
            >
               <Menu className="cursor-pointer sm:mr-1 mx-1 sm:mx-0" />
               {/* // TODO {user.email} */}
               <UserAvatar
                  email={user?.primaryEmailAddress ?? "louis@louis.fr"}
                  image={user?.primaryEmailAddress ?? "louis@louis.fr"}
               />
            </Button>
         </DropdownMenuTrigger>
         {/* Contenu du menu */}
         <DropdownMenuContent className="w-56 px-3 py-4 rounded">
            {/* // TODO Mettre nom de l'utilisateur */}
            {/* <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel> */}
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Link href="/user/15">Mon compte</Link>
               </DropdownMenuItem>

               {/* Déconnexion */}
               <DropdownMenuItem>
               <SignOutButton />
                  {/* <Link href="/">Déconnexion</Link> */}
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <ThemeToggle />
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>Cartes cadeaux</DropdownMenuItem>
               <DropdownMenuItem>
                  <Link href="/annonce/ajouter">
                     Mettre mon logement en location
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}