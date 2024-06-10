import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import CategoryFilters from "@/components/home/CategoryFilters";
import UpdateUserForm from "@/components/forms/user/UpdateUserForm";
import { getAllCategories } from "@/queries/getAllCategories";
import CategoriesCarousel from "@/components/home/Carousel";
import SideNav from "@/components/navigation/SideNav";
import WelcomeStep from "@/components/user/onboarding/steps/WelcomeStep";

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
   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <div className="flex">
         <SideNav/>
         <div className="w-full md:mx-5 pt-2">
            <CategoriesCarousel category={categories} />
            <HousesList houses={houses} />
         </div>
      </div>
   );
}
