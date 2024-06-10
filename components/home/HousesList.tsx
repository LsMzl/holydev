import { House } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import HouseCard from "../elements/cards/HouseCard";
import Container from "../elements/Container";
import PageTitle from "../admin/PageTitle";

const HousesList = async ({ houses }: { houses: House[] }) => {
   return (
      <Container className="">
         <div className="flex items-center md:gap-5 mt-3 md:mt-5">
            <PageTitle title="Toutes les annonces" className="text-2xl md:text-3xl font-semibold"/>
            <p className="hidden md:block text-sm font-medium">in france \/</p>
         </div>
         <div className="flex items-center justify-between mt-5">
            <div className="text-sm flex items-center gap-5 font-medium">
               <p>Autour de moi</p>
               <p>Partout dans le monde</p>
            </div>
            <div className="hidden md:block">
               <p>Trier par</p>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5 mt-4 border rounded-xl p-3 bg-content">
            {houses.map((house) => (
               <HouseCard key={uuidv4()} house={house} />
            ))}
         </div>
      </Container>
   );
};

export default HousesList;
