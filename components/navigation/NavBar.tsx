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


export function NavBar() {
  const { userId } = useAuth();

  return (
    <div className="border-b border-gray-200 bg-background/50">
      <Container className="flex items-center py-3 justify-between">
        {/* Logo */}
        <Link href="/" className="text-4xl hidden sm:block">
          <div className="flex items-center gap-2">
            <Image src={Logo} width={60} height={60} alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers" />
            <Typography variant="lead" className="font-semibold text-red-500">
              Holydevs
            </Typography>
          </div>
        </Link>
        {/* Input */}
        <div className="flex">
          <input className="border-r-0 rounded-r-0 border rounded-l-full border-gray-500 py-1.5" />
          <button
            className="border border-l-0 border-gray-500 rounded-r-full pr-2"
            type="submit"
          >
            <Search size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Locate />
          {/* Menu déroulant */}
          {userId ? <UserMenu /> : <GuestMenu />}
        </div>
      </Container>
      
    </div>
  );
}
