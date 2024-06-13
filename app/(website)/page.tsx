import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import { getAllCategories } from "@/queries/getAllCategories";
import CategoriesCarousel from "@/components/home/Carousel";
import SideNav from "@/components/navigation/SideNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { House, User } from "@prisma/client";
import LastHousesCarousel from "@/components/home/LastHousesCarousel";
import { getLastHouses } from "@/queries/getLastHouses";
import Spacing from "@/components/elements/Spacing";

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

   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");

   const lastHouses = await getLastHouses();

   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <div className="flex w-full px-2">
         <div className="lg:w-[23%] 2xl:w-[18%]">
            <SideNav
               userMail={connectedUser?.email}
               userAvatar={connectedUser?.profilePicture}
               userFirstName={connectedUser?.firstName}
               userLastName={connectedUser?.lastName}
               username={connectedUser?.pseudo}
               userId={connectedUser?.clerkId}
            />
         </div>
         <div className="pt-2 w-[100%] lg:w-[77%] 2xl:w-[82%]">
            <LastHousesCarousel house={lastHouses} />
            <Spacing size="xs" />
            <HousesList houses={houses} categories={categories} /> 
         </div>
      </div>
   );
}
