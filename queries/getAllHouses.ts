import { db } from "@/lib/db";

/**
 * Récupération de toutes les annonces.
 * @param searchParams - Filtrage et recherche des annonces.
 * @returns Array - Tableau contenant toutes les annonces.
 */
export const getAllHouses = async (searchParams: {
   title: string;
   country: string;
   state: string;
   city: string;
}) => {
   try {
      const { title, country, state, city } = searchParams;
      const houses = await db.house.findMany({
         where: {
            title: {
               contains: title,
            },
            country,
            state,
            city,
            },
        //! Inclure infos du propriétaire, prochaine disponibilité
         include: {
            user: true,
         },
      });

      return houses;
   } catch (error: any) {
      console.log("error", error);
      throw new Error(error);
   }
};
