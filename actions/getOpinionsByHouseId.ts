import { db } from "../lib/db";

export const getOpinionsByHouseId = async (houseId: string) => {
   try {
      const opinions = await db.opinion.findMany({
         where: {
            houseId: houseId,
         },
         include: {
            author: {
               select: {
                  firstName: true,
                  lastName: true,
                  pseudo: true,
                  profilePicture: true,
               }
            },
            house: true,
         },
      });

      //! No house found
      if (!opinions) {
         return null;
      }

      return opinions;
   } catch (error: any) {
      throw new Error(error);
   }
};
