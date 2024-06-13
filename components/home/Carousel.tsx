"use client";
import React from "react";

import Container from "../elements/Container";
import { Button } from "../ui/button";
import { Category } from "@prisma/client";
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
}

const CategoriesCarousel = ({ category }: CategoryFiltersProps) => {
   return (
      <div className="">
         <Carousel
            opts={{
               align: "start",
            }}
            className="w-full relative pt-5"
         >
            <CarouselContent>
               <Button size="sm" className="shadow hover:bg-secondary">
                  Tout
               </Button>

               {category.map((item) => (
                  <CarouselItem key={uuidv4()} className="basis-1/7">
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary"
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
