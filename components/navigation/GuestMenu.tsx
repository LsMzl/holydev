import { Avatar, AvatarImage } from "../ui/avatar";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuGroup,
   DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
   ClerkProvider,
   SignInButton,
   SignedIn,
   SignedOut,
   UserButton,
} from "@clerk/nextjs";

export const GuestMenu = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               className="py-5 px-1 rounded-full drop-shadow-md"
               size="lg"
            >
               <Menu className="cursor-pointer sm:mr-1 mx-1 sm:mx-0" />
               <Avatar className="hidden sm:block ml-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         {/* Contenu du menu */}
         <DropdownMenuContent className="w-56 px-3 py-4 rounded">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Link href="/sign-up">Inscription</Link>
               </DropdownMenuItem>

               <DropdownMenuItem>
               <Link href="/sign-in">Connexion</Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};