import { db } from "@/lib/db";

export const getAllEquipments = async () => {
   try {
      const equipments = await db.equipment.findMany();
      return equipments;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
