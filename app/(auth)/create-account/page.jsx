// "use client"
// import React from 'react'
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import Image from "next/image"
// import { ShoppingCart } from "lucide-react";
// import Link from "next/link"
// function createAccount() {
//   const { userName, setUserName } = useState()
//   const { password, setPassword } = useState()
//   const { email, setEmail } = useState()
//   const onCreateAccount = () => {
//     console.log(userName, password, email);
//   };
//   return (
//     <div className=" items-baseline flex m-30 justify-center">
//       <div className=" border rounded-lg flex flex-col items-center bg-gray-200 w-100 p-5 ">
//         <ShoppingCart
//           className="border rounded-r-lg p-1 bg-red-200 "
//           size={44}
//           color="green"
//           strokeWidth={2.5}
//         />
//         {/* <Image src="/logo.png" width={200} height={60} alt="Logo" /> */}
//         <h2 className="p-2 text-gray-500"> Create New Account</h2>

//         <div className="flex flex-col w-full gap-5 p-5 text-shadow-stone-300 ">
//           <Input
//             onChange={(e) => setUserName(e.target.value)}
//             className=" bg-white"
//             id="input-field-username"
//             type="text"
//             placeholder="Enter your username"
//           />
//           <Input
//             onChange={(e) => setPassword(e.target.value)}
//             className=" bg-white"
//             id="input-field-password"
//             type="password"
//             placeholder="Enter your password"
//           />
//           <Input
//             onChange={(e) => setEmail(e.target.value)}
//             className=" bg-white"
//             id="input-field-Email"
//             type="Email"
//             placeholder="Enter your Email"
//           />
//           <Button
//             onClick={() =>  onCreateAccount()}
            
            
//             className=" bg-amber-400">Create new Account</Button>
//           <p>
//             aleady Have an Account :{" "}
//             <Link
//               className="border rounded-r-lg text-center  p-2 text-blue-400"
//               href={"/sign-in"}
//             >
//               {" "}
//               sign
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default createAccount







// تعديل الصفحه


"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { registerUser } from "../../utils/Api";

function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onCreateAccount = async () => {
    if (!userName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await registerUser(userName, email, password);

      console.log("Account created:", result);

      alert("Account created successfully!");

      // بعد التسجيل يمكنك تحويل المستخدم إلى صفحة تسجيل الدخول
      // window.location.href = "/sign-in";
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.response?.data?.error?.message ||
          "Something went wrong while creating the account"
      );
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

        <h2 className="p-2 text-gray-500">
          Create New Account
        </h2>

        <div className="flex flex-col w-full gap-5 p-5">

          {/* Username */}
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white"
            id="input-field-username"
            type="text"
            placeholder="Enter your username"
          />

          {/* Password */}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
            id="input-field-password"
            type="password"
            placeholder="Enter your password"
          />

          {/* Email */}
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
            id="input-field-email"
            type="email"
            placeholder="Enter your Email"
          />

          {/* Create Account */}
          <Button 
            disabled={!userName || !email || !password}
            onClick={onCreateAccount}
            className="bg-amber-400 hover:bg-amber-500"
          >
            Create New Account
          </Button>

          <p>
            Already Have an Account?{" "}

            <Link
              className="border rounded-lg text-center p-1 text-blue-400"
              href="/sign-in"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
