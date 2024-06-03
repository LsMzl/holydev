"use client";

import { Typography } from "@/components/ui/design-system/Typography";
import useLocation from "@/hooks/useLocations";
import { cn } from "@/lib/utils";
import { House } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const HouseCard = ({ house }: { house: House }) => {
  const router = useRouter();
  const pathName = usePathname();
  const isMyHouses = pathName.includes("my-houses");

  const {getCountryByCode} = useLocation();
  const country = getCountryByCode(house.country);

  return (
    <div
      onClick={() => !isMyHouses && router.push(`/annonce-details/${house.id}`)}
      className={cn(
        "col-span-1 cursor-pointer transition hover:scale-105",
        isMyHouses && "cursor-default"
      )}
    >
      <div className="flex flex-col bg-background/50 rounded-lg max-w-[230px] overflow-hidden">
        {/* Illustration */}
        <div className=" h-[230px] relative rounded-lg aspect-square w-full">
          <Image
            src={house.image}
            fill
            alt="Photo d'une maison"
            className="object-cover rounded-lg h-full w-full"
          />
        </div>
        {/* Details */}
        <div className="py-2 space-y-2 font-light">
          <div >
            <Typography variant="body-sm" className="font-semibold">
              {house.city}, {country?.name}
            </Typography>
            <Typography variant="body-sm" className="truncate">Nom du propriétaire {house.ownerId}</Typography>
            <Typography variant="body-sm">12-17 juin</Typography>
          </div>
          <Typography variant="body-sm"><span className="font-semibold">{house.price}€</span> par nuit</Typography>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
