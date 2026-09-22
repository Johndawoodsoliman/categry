"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";

import { getUserProfile } from "../utils/Api";

function ProductDetail({ ProductList }) {
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  // =================================
  // السعر الأساسي
  // =================================

  const basePrice = useMemo(() => {
    return ProductList?.SillingPrice ?? ProductList?.RealPrice ?? 0;
  }, [ProductList]);

  // =================================
  // السعر النهائي
  // =================================

  const totalPrice = (Number(basePrice) * quantity).toFixed(2);

  // =================================
  // Add To Cart
  // =================================

  const addToCart = async () => {
    // قراءة JWT هنا فقط بعد الضغط على الزر
    // حتى لا تحدث مشكلة Hydration
    const jwtToken = localStorage.getItem("jwt");

    // =================================
    // المستخدم غير مسجل دخول
    // =================================

    if (!jwtToken) {
      alert("Please log in to add items to the cart.");

      router.push("/sign-in");

      return;
    }

    // =================================
    // التحقق من JWT
    // =================================

    try {
      const user = await getUserProfile(jwtToken);

      console.log("Current User:", user);

      // =================================
      // بيانات المنتج
      // =================================

      const cartItem = {
        product: ProductList,
        quantity: quantity,
        totalPrice: Number(totalPrice),
      };

      console.log("Cart Item:", cartItem);

      alert(`${quantity} x ${ProductList?.Name} added to cart`);

      // =================================
      // سيتم إضافة نظام Cart هنا    2:06:25
      // =================================
    } catch (error) {
      console.error("User authentication error:", error);

      // JWT غير صالح
      localStorage.removeItem("jwt");

      alert("Your session has expired. Please log in again.");

      router.push("/sign-in");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      {/* =================================
          صورة المنتج
      ================================= */}

      <div className="flex w-full justify-center items-center">
        <Image
          alt={ProductList?.Name || "Product Image"}
          src={
            ProductList?.Image?.[0]?.url
              ? `http://localhost:1337${ProductList.Image[0].url}`
              : "/no-image.jpg"
          }
          width={450}
          height={350}
          className="rounded-lg border object-contain"
          priority
          unoptimized
        />
      </div>

      {/* =================================
          تفاصيل المنتج
      ================================= */}

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{ProductList?.Name}</h2>

        <p className="text-gray-500">{ProductList?.Description}</p>

        {/* =================================
            السعر
        ================================= */}

        <div className="flex items-center gap-4 text-lg">
          {ProductList?.SillingPrice != null && (
            <del className="text-red-400 font-semibold">
              ${ProductList?.RealPrice}
            </del>
          )}

          <span className="font-bold text-green-600">${basePrice}</span>
        </div>

        {/* =================================
            اختيار الكمية
        ================================= */}

        <div className="flex items-center gap-6 border p-3 w-fit rounded-lg">
          <button
            disabled={quantity === 1}
            onClick={() => setQuantity((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>

          <span className="text-lg font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* =================================
            السعر الإجمالي
        ================================= */}

        <h2 className="text-xl font-bold">Total Price: ${totalPrice}</h2>

        {/* =================================
            Add To Cart
        ================================= */}

        <button
          onClick={addToCart}
          className="flex gap-3 items-center justify-center mt-4 px-4 py-2
          bg-yellow-500 text-white rounded-lg
          hover:bg-yellow-600 transition"
        >
          <ShoppingBasket />
          Add to Cart
        </button>

        {/* =================================
            التصنيف
        ================================= */}

        <div>
          <span className="text-amber-400 font-bold">Category:</span>{" "}
          {ProductList?.categories?.[0]?.Name ?? "No Category"}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
