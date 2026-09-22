import React from "react";
import Image from "next/image";
import { getProductByCategory, getCategorylist } from "../../../utils/Api";
import TopCategoryList from "../../../_components/TopCategoryList";

export default async function ProductCategory({ params }) {
  const { CategoryName } = await params;

  const categoryName = decodeURIComponent(CategoryName);

  let products = [];

  try {
    products = await getProductByCategory(categoryName);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  let categoryList = [];

  try {
    categoryList = await getCategorylist();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  console.log("Category:", categoryName);
  console.log("Products:", products);

  return (
    <div className="p-5">
      {/* اسم ف */}
      <h1 className="text-3xl font-bold text-center bg-amber-100 rounded-b-lg  m-12">
        {categoryName}
      </h1>

      {/* قائمة التصنيفات */}
      <TopCategoryList
        categoryList={categoryList}
        selectedCategery={params.categoryName}
      />

      {/* المنتجات */}

      <div className=" flex justify-center     mt-10">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 

          gap-15
          justify-items-center
        "
        >
          {products?.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="
                  w-64
                  bg-white
                  border
                  rounded-xl
                  overflow-hidden
                  shadow-md
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                {/* المنتج */}
                {product?.Image?.[0]?.url && (
                  <Image
                    src={`http://localhost:1337${product.Image[0].url}`}
                    width={300}
                    height={300}
                    alt={product.Name}
                    className="
                      w-full
                      h-56
                      object-cover
                    "
                    unoptimized
                  />
                )}

                {/* بيانات 9 */}
                <div className="p-4">
                  <h2
                    className="
                    text-lg
                    font-bold
                    capitalize
                  "
                  >
                    {product.Name}
                  </h2>

                  <p
                    className="
                    text-gray-600
                    text-sm
                    mt-2
                  "
                  >
                    {product.Description}
                  </p>

                  <div
                    className="
                    flex
                    gap-3
                    mt-4
                    items-center
                  "
                  >
                    <span
                      className="
                      text-gray-400
                      line-through
                    "
                    >
                      ${product.RealPrice}
                    </span>

                    <span
                      className="
                      text-green-600
                      font-bold
                    "
                    >
                      ${product.SillingPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
