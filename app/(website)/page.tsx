import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import { getAllCategories } from "@/queries/getAllCategories";
import CategoriesCarousel from "@/components/home/Carousel";
import SideNav from "@/components/navigation/SideNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { House, User } from "@prisma/client";

interface HousesProps {
   searchParams: {
      title: string;
      country: string;
      state: string;
      city: string;
   };

}

export default async function Home({ searchParams }: HousesProps ) {
   const houses = await getAllHouses(searchParams);
   const categories = await getAllCategories();
   

   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");

   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <div className="flex">
         <SideNav
            userMail={connectedUser?.email}
            userAvatar={connectedUser?.profilePicture}
            userFirstName={connectedUser?.firstName}
            userLastName={connectedUser?.lastName}
            username={connectedUser?.pseudo}
            userId={connectedUser?.clerkId}
         />
         <div className="w-full  pt-2">
            <CategoriesCarousel category={categories} />
            <HousesList houses={houses} />
         </div>
      </div>
   );
}
