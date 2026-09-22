import Slider from "./_components/Slider";
import { getSlider, getCategorylist, getProductList } from "./utils/Api";
import CategoryList from "./_components/CategoryList";
import Product from "./_components/Product";


import Image from "next/image";

export default async function Home() {
  let sliderList = [];
  let categories = [];
  let projects = [];

  try {
    sliderList = await getSlider();
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
  }



  try {
    categories = await getCategorylist();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }


  
  try {
    projects = await getProductList();
  } catch (error) {
    console.error("Failed to fetch ProductList:", error);
  }
  return (
    <div className="px-16 py-10  mt-3 bg-amber-550 rounded-2xl  ">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categories} />
      <Product ProductList={projects} />
     

      <div className=" flex flex-col relative w-full  h-[450] ml-4 mt-8  rounded-2xl overflow-hidden ">
        <Image
          alt="joh"
          src="/150.png"
          width={1000}
          height={0}
          unoptimized
          className="object-center w-full p-1 border border-amber-600 rounded-2xl "
        />

       
      </div>
      
    </div>
  );
}
