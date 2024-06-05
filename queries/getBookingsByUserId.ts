import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

/**
 * Récupère les réservations fait par l'utilisateur connecté.
 */
export const getBookingsByUserId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Non autorisé");
    }

    const bookings = await db.booking.findMany({
      where: {
        userId: userId,
      },
      include:{
        House: true
      },

      orderBy: {
        bookedAt: "desc",
      },
    });
    if (!bookings) {
      return null;
    }
    return bookings;
  } catch (error: any) {
    console.log("error >>>", error);
    throw new Error(error);
  }
};
