import { db } from "../lib/db";

/** Récupère une maison grâce à l'id de l'annonce.
 * @params {String} houseId - Id de la maison recherchée.
 * @returns Maison trouvée.
 */
export const getHouseById = async (annonceId: string) => {
   try {
      const house = await db.house.findUnique({
         where: {
            id: annonceId,
         },
         include: {
            user: true,
            categories: true,
            types: true,
            features: true,
            Opinions: {
               select: {
                  author: {
                     select: {
                        firstName: true,
                        lastName: true,
                        profilePicture: true
                     }
                  },
                  title: true,
                  content: true,
               }
            }
            
         },
      });

      //! No house found
      if (!house) {
         return null;
      }

      return house;
   } catch (error: any) {
      throw new Error(error);
   }
};
