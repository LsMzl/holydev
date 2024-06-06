import { db } from "@/lib/db";

export const getAllCategories = async (searchParams: { name: string }) => {
   try {
      const { name } = searchParams;
      const categories = await db.category.findMany({
         where: {
            name: {
               contains: name,
            },
         },
      });
      return categories;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
