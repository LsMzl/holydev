/**
 * Page affichant les détails d'une annonce de location.
 * @creation 03.06.2024 Louis Mazzella
 */

import { getBookings } from "@/queries/getBookings";
import { getHouseById } from "@/queries/getHouseById";
import HouseDetails from "@/components/house/HouseDetails";
import React from "react";
import { getOpinionsByHouseId } from "@/actions/getOpinionsByHouseId";
import { getLastsOpinionsByHouseId } from "@/actions/getLastsOpinionsByHouseId";

interface HouseDetailsProps {
   params: {
      annonceId: string;
   };
}

const AnnonceDetails = async ({ params }: HouseDetailsProps) => {
   // Données annonce
   const house = await getHouseById(params.annonceId);
   if (!house) return <div>Oups, l'annonce n'a pas été trouvée</div>;

   /** Contient toutes les réservations d'une maison */
   const bookings = await getBookings(house?.id);

   // Données 10 derniers avis
   const lastOpinions = await getLastsOpinionsByHouseId(params.annonceId);
   if (!lastOpinions) return null;



   // Données avis de la maison
   const allOpinions = await getOpinionsByHouseId(params.annonceId);
   if (!allOpinions) return null;

   return (
      <HouseDetails
         house={house}
         bookings={bookings}
         lastOpinions={lastOpinions}
         allOpinions={allOpinions}
      />
   );
};

export default AnnonceDetails;
