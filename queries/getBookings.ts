import { db } from "@/lib/db";

/** Récupération des réservations d'une maison. */
export const getBookings = async (houseId: string) => {
    try {

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        // Récupération des réservations depuis la base de données 
        const bookings = await db.booking.findMany({
            where: {
                houseId: houseId,
                endDate: {
                    gt: yesterday,
                }
            }
        })

        return bookings;

    } catch (error: any) {
        throw new Error(error);
    }
}