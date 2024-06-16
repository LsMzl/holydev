import { db } from "@/lib/db";

export const getAllFeatures = async () => {
   try {
      const features = db.feature.findMany();
      return features;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
