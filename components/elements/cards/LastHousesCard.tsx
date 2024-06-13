import useLocation from "@/hooks/useLocations";
import { House } from "@prisma/client";
import { MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import React from "react";

const LastHousesCard = ({ house }: { house: House }) => {
   const { getCountryByCode } = useLocation();
   const country = getCountryByCode(house.country);
   return (
      <div className="relative h-[150px] md:h-[200px] lg:h-[220px] xl:h-[260px] min-w-[200px] bg-background rounded-lg">
         <Image
            src={house.image}
            alt=""
            fill
            className="object-cover rounded-lg"
         />
         <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/50 w-full h-full z-20 absolute top-0 left-0 rounded-lg" />
         <div className="absolute p-4 text-white z-20 bottom-0 left-0 space-y-1">
            <p className="text-sm capitalize w-[170px] text-ellipsis overflow-hidden whitespace-nowrap">{house.title}</p>
            <div className="flex items-center gap-1">
               <MapPin size={15} />
               <p className="text-xs">
                  {country?.name}, {house.city}
               </p>
            </div>
            <div className="flex items-center gap-1">
               <Ticket size={15} />
               <p className="text-xs">{house.price}€ /nuit</p>
            </div>
         </div>
      </div>
   );
};

export default LastHousesCard;
