import { db } from "../lib/db";

export const getLastsOpinionsByHouseId = async (houseId: string) => {
   try {
      const opinions = await db.opinion.findMany({
         where: {
            houseId: houseId,
         },
         take: 10,
         orderBy: {
            createdAt: "desc",
         },
         include: {
            author: {
               select: {
                  pseudo: true,
                  firstName: true,
                  lastName: true,
                  profilePicture: true,
               }
            },
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
