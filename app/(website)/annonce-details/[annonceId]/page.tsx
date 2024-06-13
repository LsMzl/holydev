/**
 * Page affichant les détails d'une annonce de location.
 * @creation 03.06.2024 Louis Mazzella
 */

import { getBookings } from "@/queries/getBookings";
import { getHouseById } from "@/queries/getHouseById";
import HouseDetails from "@/components/house/HouseDetails";
import React from "react";

interface HouseDetailsProps {
   params: {
      annonceId: string;
   };
}

const AnnonceDetails = async ({ params }: HouseDetailsProps) => {
   const house = await getHouseById(params.annonceId);
   if (!house) return <div>Oups, l'annonce n'a pas été trouvée</div>;

   /** Contient toutes les réservations d'une maison */
   const bookings = await getBookings(house?.id);

   return <HouseDetails house={house} bookings={bookings} user={house.user} />;
};

export default AnnonceDetails;
