import { db } from "@/lib/db";

/**
 * Récupère un utilisateur grâce à l'identifiant de clerk.
 * @param userId String - Id de l'utilisateur recherché.
 * @returns Utilisateur trouvé
 * @creation 11.06.2024 - Louis Mazzella
 */
export const getUserByClerkId = async (userId: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            clerkId: userId,
         },
         include:{
            houses: true
         }
      });

      //! No user found
      if (!user) {
         return null;
      }

      return user;
   } catch (error: any) {
      throw new Error(error);
   }
};
