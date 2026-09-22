"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { loginUser } from "../../utils/Api";

function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!identifier || !password) {
      alert("Please enter username/email and password");
      return;
    }

    try {
      const result = await loginUser(identifier, password);

      console.log("Login successful:", result);

      localStorage.setItem("jwt", result.jwt);
      localStorage.setItem("user", JSON.stringify(result.user));

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);

      alert(error.response?.data?.error?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center m-30">
      <div className="border rounded-lg flex flex-col items-center bg-gray-200 w-100 p-5">
        <ShoppingCart
          className="border rounded-r-lg p-1 bg-red-200"
          size={44}
          color="green"
          strokeWidth={2.5}
        />

        <h2 className="p-2 text-gray-500">Sign In</h2>

        <div className="flex flex-col w-full gap-5 p-5">
          {/* Username / Email */}
          <Input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="bg-white"
            type="text"
            placeholder="Enter username or email"
          />

          {/* Password */}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
            type="password"
            placeholder="Enter your password"
          />

          {/* Login Button */}
          <Button
            disabled={!identifier || !password}
            onClick={onLogin}
            className="bg-amber-400 hover:bg-amber-500"
          >
            Sign In
          </Button>

          <p className="flex items-center gap-2">
            Don't have an account?
            <Link
              href="/create-account"
              className="border rounded-lg text-center px-3 py-2 text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
