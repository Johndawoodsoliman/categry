
"use client";



import React from "react";
import  Image  from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider({sliderList}) {
  return (
    // carousel   on shadcn   className="w-130 h-50 p-4 items-center"
    <Carousel className="w-full border rounded-2xl p-1 md:p-3 lg:p-4 shadow-lg">
      <CarouselContent className="">
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            {slider?.image?.[0]?.url ? (
              <div className="relative w-full h-[200px] md:h-[380px] rounded-2xl overflow-hidden">
                <Image
                  src={`http://localhost:1337${slider.image[0].url}`}
                  alt="slider"
                  width={1000 }
                  height={0}
                  className="object-cover w-full h-full rounded-2xl"
                  loading="eager"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full h-[200px] md:h-[380px] bg-gray-200 flex items-center justify-center rounded-2xl">
                No image
              </div>
            )}

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
