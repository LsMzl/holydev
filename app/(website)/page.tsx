import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import CategoryFilters from "@/components/home/CategoryFilters";
import UpdateUserForm from "@/components/forms/user/UpdateUserForm";
import { getAllCategories } from "@/queries/getAllCategories";
import CategoriesCarousel from "@/components/home/Carousel";
import SideNav from "@/components/navigation/SideNav";
import WelcomeStep from "@/components/user/onboarding/steps/WelcomeStep";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";

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

   const { userId } = auth();
   const user = await getUserByClerkId(userId ?? "");

   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <div className="flex">
         <SideNav
            userMail={user?.email}
            userAvatar={user?.profilePicture}
            userFirstName={user?.firstName}
            userLastName={user?.lastName}
            username={user?.pseudo}
         />
         <div className="w-full md:mx-5 pt-2">
            <CategoriesCarousel category={categories} />
            <HousesList houses={houses} />
         </div>
      </div>
   );
}
