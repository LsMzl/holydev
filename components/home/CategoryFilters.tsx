"use client";
import React from "react";
import Container from "../elements/Container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { getAllCategories } from "@/queries/getAllCategories";
import { v4 as uuidv4 } from "uuid";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles

import { Category } from "@prisma/client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

interface CategoryFiltersProps {
   category: Category[];
}

const CategoryFilters = ({ category }: CategoryFiltersProps) => {
   const settings = {
      dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   };

   return (
      <Container className="flex justify-start text-sm font-semibold overflow-hidden">
         {/* Carousel */}
            <Slider {...settings}>
               {/* <Button size="sm" className="shadow">
                  Tout
               </Button> */}
               <div className="inline-block">1</div>
               <div>2</div>
               
               
 
            </Slider>
         {/* <div className="slider-container"> */}
         {/* </div> */}
         {/* <Button variant="link" className="rounded-full p-2 shadow bg-gray-500">
            <ChevronRight />
         </Button> */}
      </Container>
   );
};

export default CategoryFilters;
