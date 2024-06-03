/**
 * Page affichant les détails d'une annonce de location.
 * @creation 03.06.2024 Louis Mazzella
 */

import { getHouseById } from "@/app/actions/getHouseById";
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

  return <HouseDetails house={house}/>;
};

export default AnnonceDetails;
