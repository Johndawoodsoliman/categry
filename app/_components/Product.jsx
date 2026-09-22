// صوره المنتج  الكبيرة  
"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Star } from "lucide-react";
// dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import ProductDetail from './ProductDetail';

function Product({ ProductList }) {
  return (
    <div className="   m-4       w-full">
      <h2 className="text-yellow-500 my-4 font-bold text-2xl">
        Popular Products
      </h2>

      {/* FIXED GRID */}
      <div className="w-full grid ~grid-cols-1 md:grid-cols-4   gap-5">
        {/* i choose  index<8&&  only */}
        {ProductList.map(
          (cat, index) =>
            index < 8 && (
              <div
                key={index}
                className="shadow-lg rounded-2xl bg-amber-100 
              p-3 border hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  {/* IMAGE FIXED — No warnings */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden">
                    <Image
                      src={
                        cat?.Image?.[0]?.url
                          ? `http://localhost:1337${cat.Image[0].url}`
                          : "/no-image.jpg"
                      }
                      alt={cat.Name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-center mt-3 font-semibold capitalize">
                    {cat.Name}
                  </h3>

                  {/* RATING */}
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* PRICES */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-green-700">
                      {cat.SillingPrice} $
                    </span>
                    <del className="text-red-600">{cat.RealPrice} $</del>
                  </div>

                  {/* BUTTON */}

                  <Dialog className="mt-4">
                    <DialogTrigger asChild>
                      <Button
                        className=" sm:w-34  flex flex-col justify-center items-center font-semibold mt-4
                 bg-yellow-500 rounded-full cursor-pointer
                 hover:bg-yellow-400 transition-all
                 hover:shadow-md active:scale-95  "
                      >
                        Add To Cart
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription asChild className="mt-4">
                          <ProductDetail ProductList={cat} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Product;
