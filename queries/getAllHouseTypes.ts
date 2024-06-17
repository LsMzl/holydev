import { db } from "@/lib/db";

export const getAllHouseTypes = async () => {
   try {
     const houseTypes = db.houseType.findMany()
     return houseTypes;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
