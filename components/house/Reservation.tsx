"use client";

import useBookHouse from "@/hooks/useBookHouse";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "../ui/button";
import { Loader, Wand2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Booking, House } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

interface HouseProps {
  house: House;
  bookings?: Booking[];
}

const Reservation = async ({ house, bookings = [] }: HouseProps, allBookings: any) => {
  

  



  

  


  return (
    
  );
};

export default Reservation;
