import { db } from "@/lib/db";

/**
 * Récupère un utilisateur grâce à son id.
 * @param userId String - Id de l'utilisateur recherché.
 * @returns Utilisateur trouvé
 * @creation 07.06.2024 - Louis Mazzella
 */
export const getUserById = async (userId: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            id: userId,
         },
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
