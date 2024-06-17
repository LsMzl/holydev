import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import { getAllCategories } from "@/queries/getAllCategories";
import SideNav from "@/components/navigation/SideNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { House, User } from "@prisma/client";
import LastHousesCarousel from "@/components/home/LastHousesCarousel";
import { getLastHouses } from "@/queries/getLastHouses";
import Spacing from "@/components/elements/Spacing";
import { getAllHouseTypes } from "@/queries/getAllHouseTypes";

interface HousesProps {
   searchParams: {
      title: string;
      country: string;
      state: string;
      city: string;
   };
}

export default async function Home({ searchParams }: HousesProps) {
   const houses = await getAllHouses(searchParams);
   const categories = await getAllCategories();
   const houseTypes = await getAllHouseTypes();

   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");

   const lastHouses = await getLastHouses();

   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <div className="flex w-full min-h-screen">
         <div className="lg:w-[20%] 2xl:w-[15%]">
            <SideNav
               userMail={connectedUser?.email}
               userAvatar={connectedUser?.profilePicture}
               userFirstName={connectedUser?.firstName}
               userLastName={connectedUser?.lastName}
               username={connectedUser?.pseudo}
               userId={connectedUser?.clerkId}
            />
         </div>
         <div className="w-[100%] lg:w-[80%] 2xl:w-[85%]">
            <Spacing size="xs" />
            <LastHousesCarousel house={lastHouses} />
            <Spacing size="xs" />
            <HousesList
               houses={houses}
               categories={categories}
               houseTypes={houseTypes}
            />
         </div>
      </div>
   );
}
