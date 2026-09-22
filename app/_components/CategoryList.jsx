import React from "react";
import Image from "next/image";
import  Link  from "next/link"; 


function CategoryList({ categoryList }) {
  return (
    <div className="my-8  p-6 ">
      <h2 className="text-yellow-500 font-bold mt-3 text-2xl">
        Shop By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 capitalize justify-items-center">
        {categoryList?.map((cat, index) => (
          <Link
            className="do bg-amber-100  border-2 flex flex-col items-center justify-center p-3 cursor-pointer rounded-lg hover:bg-amber-200 hover:scale-105 transition-all duration-300"
            href={`/Products-Category/${cat.Name}`}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-16 h-16 object-cover mb-2 rounded-full"
              src={`http://localhost:1337${cat?.icon?.[0]?.url}`}
              width={60}
              height={60}
              alt="icon"
              unoptimized={true}
            />
            <span className="mt-1 text-yellow-500 ">{cat.Name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
