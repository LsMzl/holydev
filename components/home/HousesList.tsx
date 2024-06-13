"use client";
import { House, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import HouseCard from "../elements/cards/HouseCard";
import Container from "../elements/Container";
import PageTitle from "../admin/PageTitle";

import CountryFilter from "./CountryFilter";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Banknote, Star, Tag, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const HousesList = ({
   houses,
   user,
}: {
   houses: House[];
   user?: User | null;
}) => {
   const router = useRouter();

   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");

   return (
      <Container className="ml-0">
         <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-4">
            <PageTitle
               title="Toutes les annonces"
               className="text-2xl md:text-3xl font-semibold"
            />
            <div className="flex items-center gap-2 mt-1.5">
               <p>en</p>
               <CountryFilter />
            </div>
         </div>
         <div className="flex items-center justify-between mt-5">
            <div className="text-sm flex items-center gap-5 font-medium">
               <p>Autour de moi</p>
               <p className="underline decoration-cyan-500 decoration-2 underline-offset-4">
                  Partout dans le monde
               </p>
            </div>
            <div className="hidden md:block">
               <p>Trier par</p>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5 mt-4">
            {houses.map((house) => (
               <HouseCard key={uuidv4()} house={house} user={user} />
            ))}
         </div>
      </Container>
   );
};

export default HousesList;
