"use client";

import { Booking, House } from "@prisma/client";
import Container from "../elements/Container";
import useLocation from "@/hooks/useLocations";
import { Typography } from "../ui/design-system/Typography";
import Image from "next/image";
import { Dot, Heart, MapPin, Share, Star } from "lucide-react";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import LeafletMap from "./LeafletMap";
import Link from "next/link";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";

const HouseDetails = ({
  house,
  bookings,
}: {
  house: House;
  bookings?: Booking[];
}) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  const country = getCountryByCode(house.country);
  const state = getStateByCode(house.country, house.state);

  // Gestion des reservations
  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Si les date provenant de <DateRange> existent
    if (date && date.from && date.to) {
      // Calcul du nombre de jours
      const dayCount = differenceInCalendarDays(date.to, date.from);
      // Update du nombre de jours
      setDays(dayCount);

      // Calcul du prix selon le nombre de jours
      if (dayCount) {
        setTotalPrice(dayCount * house.price);
      } else {
        // Prix pour une journée
        setTotalPrice(house.price);
      }
    }
  }, [date, house.price]);

  return (
    <Container>
      {/* //TODO: Mettre un carousel */}
      <div className="flex justify-between items-center mb-3">
        {/* Titre de l'annonce */}
        <h1 className="font-medium text-xl md:text-3xl">{house.title}</h1>
        {/* Share & Save */}
        <div className="flex items-center gap-2 md:gap-5">
          <span className="flex items-center gap-1">
            <Share size={20} />
            <p className="hidden md:block md:text-sm">Partager</p>
          </span>
          <span className="flex items-center gap-1">
            <Heart size={20} />
            <p className="hidden md:block md:text-sm">Ajouter aux favoris</p>
          </span>
        </div>
      </div>
      {/* Illustration */}
      <div className="relative w-full h-[200px] md:h-[450px] bg-background mb-3 md:mb-10">
        <Image
          src={house.image}
          fill
          alt={house.title ?? ""}
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full md:gap-10">
        {/* Left section */}
        <div className="flex flex-col md:w-[70%]">
          {/* Localisation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm md:text-xl">
              <MapPin className="h-5 w-5 mr-1" />
              <p>
                {country?.name}, {state?.name}, {house.city}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star />
              <p>4,5</p>
            </div>
          </div>

          {/* Nombre de chambre etc */}
          <ul className="flex items-center text-md font-light">
            <li>4 chambres</li>
            <span>
              <Dot size={15} />
            </span>
            <li>5 lits</li>
            <span>
              <Dot size={15} />
            </span>
            <li>2 salles de bain</li>
          </ul>

          {/* Pricing */}
          <div className="border-b pb-5 md:pb-8 flex items-center gap-1">
            <p className="text-lg font-medium">{house.price} €</p>
            <p className="text-lg">
              /<span className="text-sm">nuit</span>{" "}
            </p>
          </div>

          {/* Description */}
          <Typography className="mt-5 md:mt-8 mb-2 text-md md:text-xl font-medium">
            En savoir plus sur le logement
          </Typography>
          <p className="text-sm md:text-base overflow-hidden h-20 md:h-[170px] font-light">
            {house.description}
          </p>
          {/* Date de mise en ligne */}
          <Typography variant="body-xs" className=" md:pb-5 mt-2">
            Mis en ligne le <span className="font-medium">{format(house.createdAt, "dd MMMM yyyy")}</span>{" "}
          </Typography>

          {/* Owner Informations & Contact */}
          <div className="flex items-center justify-between gap-2 mt-3 border rounded-lg shadow p-3 hover:shadow-none hover:bg-background/80">
            {/* Lien vers le profil de l'utilisateur */}
            <Link href="/" title="Profil de l'utilisateur">
              <div className="flex items-center gap-2">
                {/* owner pic */}
                <Avatar className="">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="rounded-full h-14 w-14"
                  />
                </Avatar>
                {/* Owner details */}
                <div className="flex flex-col">
                  <p className="font-medium">{house.ownerId}</p>
                  <p className="text-sm">{house.ownerId}</p>
                </div>
              </div>
            </Link>

            {/* //TODO: Si connecté, lien vers le tchat, sinon lien vers page de connexion et toast pour indiquer qu'il doit être connecté pour contacter le membre*/}
            <Button
              variant="secondary"
              title="Contacter l'utilisateur"
              className="shadow"
              onClick={() => console.log("contact")}
            >
              Contacter
            </Button>
          </div>

          {/* Description */}
          <Typography className="mt-5 md:mt-8 mb-2 text-md md:text-xl font-medium">
            Ce que propose ce logement
          </Typography>
          <div className="w-full h-96 bg-indigo-300">
            liste de tous les équipements
          </div>
        </div>

        {/* Right section */}
        <div className="md:w-[30%]">
          <div className=" md:rounded-xl md:border md:shadow-md md:p-5">
            <h4 className="font-medium text-xl mb-3">Réservation</h4>
            {/* Calendrier */}
            <div className="mb-5">
              <p className="text-sm mb-2">
                Choisissez les dates de votre séjour
              </p>
              <DateRangePicker date={date} setDate={setDate} />
            </div>
            {/* //TODO: Si connecté, lien vers page de réservation, sinon lien vers page de connexion et toast pour indiqué qu'il doit être connecté pour réserver*/}
            <Button className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
              Réserver
            </Button>
            <p className="text-center my-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div className="text-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p>
                  {house.price} € x {days} nuits
                </p>
                <p>{totalPrice} €</p>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  {house.price} € x {days} nuits
                </p>
                <p>{totalPrice} €</p>
              </div>
              <div className="flex items-center justify-between pb-5 border-b">
                <p>
                  {house.price} € x {days} nuits
                </p>
                <p>{totalPrice} €</p>
              </div>
              <div className="pt-3 font-semibold flex items-center justify-between">
              <p>
                  Total
                </p>
                <p>{totalPrice} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        {/* Avis */}
        <div className="mt-5 flex items-center gap-2 border-t pt-5">
          <Star />
          <Typography>4.6</Typography>
          <Typography>561 avis</Typography>
          <Button variant="outline" className="rounded-full">
            Voir tout
          </Button>
        </div>

        <div className="flex items-center justify-between gap-8 mt-5 border-b py-5">
          <div className="flex flex-col items-center justify-between">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full h-14 w-14"
              />
            </Avatar>
            <Typography variant="body-sm" className="text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem.
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full h-14 w-14"
              />
            </Avatar>
            <Typography variant="body-sm" className="text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem.
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full h-14 w-14"
              />
            </Avatar>
            <Typography variant="body-sm" className="text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem.
            </Typography>
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section>
        <h4 className="mt-5 md:mt-8 md:mb-5 text-md md:text-xl font-medium">
          Où se situe le logement
        </h4>

        {/* Map */}
        <LeafletMap
          cityLatitude={state?.latitude ?? ""}
          cityLongitude={state?.longitude ?? ""}
        />
      </section>
    </Container>
  );
};

export default HouseDetails;
