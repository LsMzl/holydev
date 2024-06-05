import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/db";

/** Récupère l'ensemble des anoonces d'un utilisateur grâce à son id.
 * @returns Array - Ensemble des annonces d'un utilisateur.
 */
export const getHousesByUserId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Non autorisé");
    }

    const houses = await db.house.findMany({
      where: {
        ownerId: userId,
      },
    });

    //! No houses found
    if (!houses) {
      return null;
    }

    return houses;
  } catch (error: any) {
    throw new Error(error);
  }
};
