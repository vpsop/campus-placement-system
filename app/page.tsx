"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {

  const user = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    // If user is logged in redirect to the home page 
    if (user.authUser === null) router.push("/login");
  }, [user, router]);

  return (
    <main className="min-h-screen flex">
      <div className="w-72 border-r border-gray-200 flex flex-col items-center pt-8 gap-y-16">
        <p className="font-bold text-xl">Admin Panel</p>
        <ul className="flex flex-col text-center gap-10 w-full">
          <Link href="/admin/create-opening" className="bg-blue-400 p-4 mx-2 rounded-full text-white"><li>Create Opening</li></Link>
          <li>Display Opening</li>
          <li>Add Company</li>
          <li>Display Companies</li>
        </ul>
      </div>
      <div className="grow">
        <nav className="h-20 w-full border-b border-gray-200 flex items-center justify-between px-20">
          <div className="logo"></div>
          <ul className="flex list-none gap-20">
            <li>Home</li>
            <li>Admin</li>
            <li>About Us</li>
          </ul>
          <div className="profile-btn h-10 w-10 aspect-square rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </nav>
      </div>
    </main>
  );
}


