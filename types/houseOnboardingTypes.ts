import { Category, Feature, House, HouseType } from "@prisma/client";

export interface ComponentsProps {
   house?: House | null;
   categories?: Category[];
   equipements?: Feature[];
   types?: HouseType[];
}
