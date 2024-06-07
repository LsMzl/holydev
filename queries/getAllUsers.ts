import { db } from "@/lib/db";

export const getAllUsers = async () => {
   try {
      const users = await db.user.findMany({
         select:{
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profilePicture: true,
            createdAt: true,
         }
      });
      return users;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
