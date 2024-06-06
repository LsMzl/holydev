import HousesList from "@/components/home/HousesList";

import { getAllHouses } from "../queries/getAllHouses";
import LocationFilter from "@/components/navigation/LocationFilter";

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
         <LocationFilter />
         <HousesList houses={houses} />
      </>
   );
}
