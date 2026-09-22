import React from "react";
import Link from "next/link";
import Image from "next/image";

function TopCategoryList({ categoryList }) {
  return (
    <div>
      <h2 className="  p-7  text-xl text-gray-800 text-center  font-bold mb-4">Shop By Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 capitalize justify-items-center">
        {categoryList?.map((cat) => (





          

          
          <Link
            key={cat.id}
            className="bg-amber-100 border-2 flex flex-col items-center justify-center p-3 cursor-pointer 
            rounded-lg hover:bg-amber-200 hover:scale-105 transition-all duration-300"
            href={`/Products-Category/${encodeURIComponent(cat.Name)}`}
          >
            {cat?.icon?.[0]?.url && (
              <Image
                className="w-16 h-16 object-cover mb-2 rounded-full"
                src={`http://localhost:1337${cat.icon[0].url}`}
                width={60}
                height={60}
                alt={cat.Name}
                unoptimized
              />
            )}

            <span className="mt-1 text-yellow-500">{cat.Name}</span>
          </Link>








        ))}
      </div>





    </div>
  );
}

export default TopCategoryList;
