import MyBookingsClient from "@/components/bookings/MyBookingsClient";
import Container from "@/components/elements/Container";
import { getBookingsByHouseOwnerId } from "@/queries/getBookingsByHouseOwnerId";
import { getBookingsByUserId } from "@/queries/getBookingsByUserId";
import { uuid as v4 } from "uuidv4";

const UserBookings = async () => {
   const bookingsFromUsers = await getBookingsByHouseOwnerId();
   const bookingsFromMe = await getBookingsByUserId();

   //! Pas de réservation trouvée
   if (!bookingsFromUsers && !bookingsFromMe)
      return <div>Aucune réservation trouvée</div>;

   return (
      <Container className="flex flex-col gap-10">
         {!!bookingsFromMe?.length && (
            <div>
               <h2 className="text-xl md:text-2xl font-medium mb-6">
                  Mes réservations personnelles
               </h2>
               <div className="flex flex-col gap-5">
                  {bookingsFromMe.map((booking) => (
                     <MyBookingsClient key={v4()} booking={booking} />
                  ))}
               </div>
            </div>
         )}

         {!!bookingsFromUsers?.length && (
            <div>
               <h2 className="text-xl md:text-2xl font-medium mb-6">
                  Réservations sur mes maisons
               </h2>
               <div className="flex flex-col gap-5">
                  {bookingsFromUsers.map((booking) => (
                     <MyBookingsClient key={v4()} booking={booking} />
                  ))}
               </div>
            </div>
         )}
      </Container>
   );
};

export default UserBookings;
