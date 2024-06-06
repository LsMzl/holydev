"use client";

// Components


// Icons
import { Locate, Search } from "lucide-react";

// React / Next
import Link from "next/link";



import { Typography } from "../ui/design-system/Typography";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";

import { useAuth } from "@clerk/nextjs";

import Container from "../elements/Container";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import SearchInput from "./SearchInput";


export function NavBar() {
  const { userId } = useAuth();

  return (
    <div className="border-b border-gray-200 bg-background/50">
      <Container className="flex items-center py-3 justify-between">
        {/* Logo */}
        <Link href="/" className="text-4xl " title="Retour à la page d'accueil">
          <div className="flex items-center gap-2">
            <Image src={Logo} width={60} height={60} alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers." />
            <Typography variant="lead" className="hidden sm:block font-semibold text-red-500">
              Holydevs
            </Typography>
          </div>
        </Link>
        {/* Input */}
        <SearchInput/>

        <div className="flex items-center gap-3">
          <Locate />
          {/* Menu déroulant */}
          {userId ? <UserMenu /> : <GuestMenu />}
        </div>
      </Container>
      
    </div>
  );
}
