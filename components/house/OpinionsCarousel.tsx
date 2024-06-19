"use client";
import React from "react";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from "@/components/ui/carousel";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface OpinionsCarouselProps {
   lastOpinions: {
      title: string;
      content: string;
      createdAt: Date;
      author: {
         lastName: string;
         firstName: string;
         pseudo: string;
         profilePicture: string;
      };
   }[];
}

const OpinionsCarousel = ({ lastOpinions }: OpinionsCarouselProps) => {
   console.log("Carousel", lastOpinions);
   return (
      <div className="">
         <Carousel
            opts={{
               align: "start",
               loop: true,
               dragFree: true,
            }}
            className="mt-5 cursor-grab"
         >
            <CarouselContent className="-ml-0">
               {lastOpinions.map((opinion) => (
                  <CarouselItem key={uuidv4()} className="basis-1/6">
                     <div
                        className="flex flex-col items-center justify-between"
                        key={uuidv4()}
                     >
                        <Link href={`/user/${opinion.author.pseudo}`}>
                           <Image
                              src={opinion.author.profilePicture}
                              alt={`Photo de ${opinion.author.firstName} ${opinion.author.lastName}`}
                              height={40}
                              width={40}
                           />
                        </Link>
                        {/* <div className="flex items-start mt-2">
                           <StarIcon size={15} />
                           <p className="text-xs">4.5/5</p>
                        </div> */}
                        <p className="text-sm font-medium">{opinion.title}</p>
                        <p className="text-center text-xs w-[150px]">
                           {opinion.content}
                        </p>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
         </Carousel>
      </div>
   );
};

export default OpinionsCarousel;
