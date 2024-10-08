import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import { getAllCategories } from "@/queries/getAllCategories";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import LastHousesCarousel from "@/components/home/LastHousesCarousel";
import { getLastHouses } from "@/queries/getLastHouses";
import Spacing from "@/components/elements/Spacing";
import { getAllHouseTypes } from "@/queries/getAllHouseTypes";
import MainSideNav from "@/components/navigation/MainSideNav";

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
            <MainSideNav
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
