"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useLocation from "@/hooks/useLocations";
import { House, User } from "@prisma/client";
import { Banknote, Star, Tag, UserIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const HouseCard = ({ house, user }: { house: House; user?: User | null }) => {
   const router = useRouter();

   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");

   const { getCountryByCode } = useLocation();
   const country = getCountryByCode(house.country);

   return (
      <div className="flex flex-col bg-card rounded-lg max-w-[380px] overflow-hidden border">
         {/* Illustration */}
         <div className=" h-[150px] relative rounded-lg aspect-square w-full hover:scale-100">
            <Image
               src={house.image}
               fill
               sizes="100%"
               alt="Photo d'une maison"
               className="object-cover rounded-t-lg h-full w-full border-b-4 border-cyan-500 "
            />
            {isMyHouses && (
               <Button
                  onClick={() => router.push(`/annonce/${house.id}`)}
                  variant="hollow"
                  className="absolute z-10 bottom-2 right-2"
               >
                  Editer
               </Button>
            )}
         </div>
         {/* Details */}
         <div className="p-5">
            <div className="">
               <p className="text-md font-semibold w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {house.title}
               </p>
               <p className="text-xs font-medium text-gray-400">
                  {house.city}, {country?.name}
               </p>
            </div>
            <Separator className="my-3" />
            <div className="flex flex-col gap-2 font-medium">
               {/* Nom du propriétaire */}
               <span className="flex items-center gap-1">
                  <UserIcon size={15} />
                  <p className="text-xs capitalize">
                     {user?.firstName} {user?.lastName}
                  </p>
               </span>
               {/* Liste des catégories */}
               <span className="flex items-center gap-1">
                  <Tag size={15} />
                  <p className="text-xs">Catégorie</p>
               </span>
               {/* Tarif par nuit */}
               <span className="flex items-center gap-1">
                  <Banknote size={15} />
                  <p className="text-xs">{house.price}€ /nuit</p>
               </span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between">
               <Button
                  size="sm"
                  onClick={() => router.push(`/annonce-details/${house.id}`)}
                  title="Lien vers la page contenant les détails de l'annonce"
               >
                  Voir
               </Button>
               <div className="flex items-center gap-1">
                  <Star size={15} />
                  <p className="text-sm">4.5</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HouseCard;
