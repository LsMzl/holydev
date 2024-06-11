import { db } from "@/lib/db";

export const getAllUsers = async () => {
   try {
      const users = await db.user.findMany({});
      return users;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
