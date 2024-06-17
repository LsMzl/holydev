import {
   Booking,
   Category,
   Feature,
   House,
   HouseType,
   Opinion,
   User,
} from "@prisma/client";

export interface dataTypes {
   house?: House;
   categories?: Category[];
   equipements?: Feature[];
   types?: HouseType[];
   bookings?: Booking[];
   user?: User[];
   opinions?: Opinion[];
}
