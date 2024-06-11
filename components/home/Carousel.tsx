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
      <Container>
         <Carousel
            opts={{
               align: "start",
            }}
            className="max-w-[310px] w-full md:max-w-[768px] lg:max-w-[1024px] 2xl:max-w-[1390px] mx-auto"
         >
            <CarouselContent>
               <CarouselItem>
                  <Button size="sm" className="shadow hover:bg-secondary">
                     Tout
                  </Button>
               </CarouselItem>
               {category.map((item) => (
                  <CarouselItem key={uuidv4()}>
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary basis-1/3"
                        key={uuidv4()}
                        variant="secondary"
                     >
                        {item.name}
                     </Button>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </Container>
   );
};

export default CategoriesCarousel;
