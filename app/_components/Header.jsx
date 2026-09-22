
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  LayoutGrid,
  ShoppingCart,
  Search,
  ShoppingBag,
  LogIn,
  LogOut,
} from "lucide-react";

import { getCategorylist, getCurrentUser } from "../utils/Api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Client Mounted
  // ==========================

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ==========================
  // User
  // ==========================

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // ==========================
  // Get Categories
  // ==========================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategorylist();

        console.log("Fetched categories in Header:", categories);

        setCategory(categories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ==========================
  // Get Current User
  // ==========================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("jwt");

        // المستخدم غير مسجل دخول
        if (!token) {
          setUser(null);
          setUserLoading(false);
          return;
        }

        // جلب المستخدم من Strapi
        const currentUser = await getCurrentUser();

        console.log("CURRENT USER:", currentUser);

        setUser(currentUser);
      } catch (error) {
        console.error("Error loading current user:", error);

        // JWT غير صالح
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  // ==========================
  // Header
  // ==========================

  return (
    <div className="mt-3 p-3 border-2 rounded-full bg-slate-200">
      <div className="flex justify-between">

        {/* ==========================
            LEFT
        ========================== */}

        <div className="flex ml-3 items-center gap-7 cursor-pointer hover:opacity-80 transition">

          {/* Shopping Cart */}

          <Link href="/cart">
            <ShoppingCart
              size={32}
              color="green"
              strokeWidth={2.5}
            />
          </Link>

          {/* Category */}

          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex gap-2 bg-slate-300 px-3 py-2 items-center cursor-pointer rounded-full"
                >
                  <LayoutGrid />

                  Category
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Category Menu
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {loading ? (
                  <DropdownMenuItem disabled>
                    Loading...
                  </DropdownMenuItem>
                ) : category.length > 0 ? (
                  category.map((cat) => (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      key={cat.id}
                    >
                      {cat?.icon?.[0]?.url && (
                        <Image
                          alt="icon"
                          src={`http://localhost:1337${cat.icon[0].url}`}
                          width={40}
                          height={40}
                          unoptimized={true}
                          className="object-cover rounded-lg"
                        />
                      )}

                      <div className="text-base">
                        {cat.Name}
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    No categories found
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              type="button"
              className="flex gap-2 bg-slate-300 px-3 py-2 items-center rounded-full"
            >
              <LayoutGrid />

              Category
            </button>
          )}

          {/* Search */}

          <div className="hidden sm:flex items-center gap-2">
            <Search className="w-5 h-5" />

            <input
              id="search"
              name="search"
              className="w-32 border rounded-full px-3 py-1 text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* ==========================
            RIGHT
        ========================== */}

        <div className="flex gap-2 items-center">

          {/* Checkout */}

          <Link
            href="/cart"
            className="flex items-center cursor-pointer rounded-full gap-2"
          >
            <ShoppingBag size={20} />

            <span className="text-fuchsia-700">
              0
            </span>

            Checkout
          </Link>

          {/* Home */}

          <Link href="/">
            Home
          </Link>

          {/* ==========================
              USER
          ========================== */}

          {userLoading ? (
            <span className="text-gray-500 text-sm">
              Loading...
            </span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-green-700">
                Hi, {user.username}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-red-600 transition"
              >
                <LogOut size={18} />

                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700 transition"
            >
              <LogIn size={18} />

              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

