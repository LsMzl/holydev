"use client";
import { Category, House, HouseType, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import HouseCard from "../elements/cards/HouseCard";
import Container from "../elements/Container";
import PageTitle from "../admin/PageTitle";

import CountryFilter from "./CountryFilter";

import { usePathname, useRouter } from "next/navigation";
import CategoriesCarousel from "./Carousel";

const HousesList = ({
   categories,
   houseTypes,
   houses
}: {
   categories: Category[];
   houseTypes: HouseType[];
   houses: House[];
}) => {
   const router = useRouter();

   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");

   return (
      <Container className="">
         <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-4">
            <PageTitle
               title="Toutes les annonces"
               className="text-xl md:text-2xl font-semibold"
            />
            <div className="flex items-center md:gap-2 md:mt-1.5">
               <p>en</p>
               <CountryFilter />
            </div>
         </div>
         {/* Categories Filter */}
         <CategoriesCarousel category={categories} houseTypes={houseTypes} />
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
            {houses.map((house: any) => (
               <HouseCard key={uuidv4()} house={house} />
            ))}
         </div>
      </Container>
   );
};

export default HousesList;
