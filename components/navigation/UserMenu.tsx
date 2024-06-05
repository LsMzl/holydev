"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Calendar,
  FilePen,
  LogOut,
  Menu,
  Notebook,
  SunMoon,
  UserRound,
} from "lucide-react";
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
          title="Ouverture du menu utilisateur"
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
          <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
            <UserRound size={15} />
            <Link href="/user/15" title="Profil utilisateur">
              Mon profil
            </Link>
          </DropdownMenuItem>

          {/* Réservations */}
          <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
            <Calendar size={15} />
            <Link href="/mes-reservations" title="Réservations de l'utilisateur">
              Mes réservations
            </Link>
          </DropdownMenuItem>

          {/* Annonces */}
          <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
            <Notebook size={15} />
            <Link href="/mes-annonces" title="Liste de mes annonces">
              Mes annonces
            </Link>
          </DropdownMenuItem>

          {/* Ajouter une annonce */}
          <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
            <FilePen size={15} />
            <Link
              href="/annonce/ajouter"
              title="Formulaire d'ajout d'annonce de location"
            >
              Ajouter une annonce
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Cartes cadeaux</DropdownMenuItem>

          {/* Theme toggle */}
          <DropdownMenuItem
            className=" flex items-center gap-1 cursor-pointer hover:text-gray-500"
            title="Passage du thème clair à sombre"
          >
            <SunMoon size={15} />
            <ThemeToggle />
          </DropdownMenuItem>

          {/* Déconnexion */}
          <DropdownMenuItem
            className="flex items-center gap-1 hover:text-gray-500 cursor-pointer"
            title="Déconnexion utilisateur"
          >
            <LogOut size={15} />
            <SignOutButton />
            {/* <Link href="/">Déconnexion</Link> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
