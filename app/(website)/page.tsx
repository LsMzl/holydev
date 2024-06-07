import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../../queries/getAllHouses";
import CategoryFilters from "@/components/home/CategoryFilters";

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

   if (!houses) return <div>Aucune annonce trouvée</div>;
   return (
      <>
         <CategoryFilters />

         <HousesList houses={houses} />
      </>
   );
}
