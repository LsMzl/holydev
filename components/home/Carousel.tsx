"use client";
import React from "react";

import Container from "../elements/Container";
import { Button } from "../ui/button";
import { Category, HouseType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoryFiltersProps {
   category: Category[];
   houseTypes: HouseType[];
}

const CategoriesCarousel = ({ category, houseTypes }: CategoryFiltersProps) => {
   return (
      <div className="">
         <Carousel
            opts={{
               align: "start",
               loop: true,
               dragFree: true,
            }}
            
            className="w-full relative pt-5"
         >
            <CarouselContent className="-ml-0">
               <Button size="sm" className="shadow hover:bg-secondary ml-4">
                  Tout
               </Button>

               {houseTypes.map((item) => (
                  <CarouselItem key={uuidv4()} className="basis-1/8">
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary hover:text-black"
                        key={uuidv4()}
                        variant="secondary"
                     >
                        {item.name}
                     </Button>
                  </CarouselItem>
               ))}
               {category.map((item) => (
                  <CarouselItem key={uuidv4()} className="basis-1/8">
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary hover:text-black"
                        key={uuidv4()}
                        variant="secondary"
                     >
                        {item.name}
                     </Button>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <div className="absolute -top-4 right-12">
               <CarouselNext />
               <CarouselPrevious />
            </div>
         </Carousel>
      </div>
   );
};

export default CategoriesCarousel;
