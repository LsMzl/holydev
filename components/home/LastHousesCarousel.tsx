import React from "react";
import Container from "../elements/Container";
import PageTitle from "../admin/PageTitle";
import { v4 as uuidv4 } from "uuid";
import LastHousesCard from "../elements/cards/LastHousesCard";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";

import { House } from "@prisma/client";

const LastHousesCarousel = ({ house }: { house: House[] }) => {
   return (
      <Container>
         <PageTitle
            title="Dernières annonces"
            className="mb-3 text-xl md:text-2xl font-semibold"
         />

         <Carousel
            opts={{
               align: "start",
            }}
            className="w-full relative"
         >
            <CarouselContent>
               {house.map((item) => (
                  <CarouselItem key={uuidv4()} className="basis-1/1 md:basis-1/7">
                     <LastHousesCard key={uuidv4()} house={item} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[50%] transform:-translate-y-[50%] left-0 z-20" />
            <CarouselNext className="absolute top-[50%] transform:-translate-y-[50%] right-0 z-20" />
         </Carousel>
      </Container>
   );
};

export default LastHousesCarousel;
