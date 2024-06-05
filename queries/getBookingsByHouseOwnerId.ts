import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

/**
 * Récupère les réservations faites par d'autres utilisateurs.
 */
export const getBookingsByHouseOwnerId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Non autorisé");
    }

    const bookings = await db.booking.findMany({
      where: {
        houseOwnerId: userId,
      },
      orderBy: {
        bookedAt: "desc",
      },
      include:{
        House: true,
      }
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
