import { db } from "@/lib/db";

export const getLastHouses = async () => {
   try {
      const houses = await db.house.findMany({
         orderBy: {
            createdAt: "desc",
         },
         take: 10,
      });
      return houses;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
