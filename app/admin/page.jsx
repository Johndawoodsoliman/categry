"use client";

import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Settings,
  Menu,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Menu size={24} />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="font-medium">Admin</div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 bg-white p-4 md:block">
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-black px-4 py-3 text-white"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <Package size={20} />
              Products
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <Tags size={20} />
              Categories
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              Orders
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <Users size={20} />
              Users
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <Settings size={20} />
              Settings
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Total Products</p>

              <h3 className="mt-2 text-3xl font-bold">125</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Categories</p>

              <h3 className="mt-2 text-3xl font-bold">6</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Orders</p>

              <h3 className="mt-2 text-3xl font-bold">48</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Users</p>

              <h3 className="mt-2 text-3xl font-bold">320</h3>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Recent Orders</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-3">Order</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="p-3">#1001</td>
                    <td className="p-3">Ahmed</td>
                    <td className="p-3">450 EGP</td>
                    <td className="p-3">Completed</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3">#1002</td>
                    <td className="p-3">Mohamed</td>
                    <td className="p-3">320 EGP</td>
                    <td className="p-3">Pending</td>
                  </tr>

                  <tr>
                    <td className="p-3">#1003</td>
                    <td className="p-3">John</td>
                    <td className="p-3">780 EGP</td>
                    <td className="p-3">Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
