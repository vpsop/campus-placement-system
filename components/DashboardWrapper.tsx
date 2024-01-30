"use client";

import { useAuthContext } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { getAuth } from "firebase/auth";
import firebaseApp from "@/firebase/config";

interface AdminDashboardProps {
    children: React.ReactNode;
}
export default function AdminDashboardWrapper({ children }: AdminDashboardProps) {

    const [isPending, startTransition] = useTransition();
    const user = useAuthContext();
    const router = useRouter();
    const currentRoute = usePathname();

    React.useEffect(() => {
        // If user is logged in redirect to the home page 
        if (user.authUser === null) router.push("/login");
    }, [user, router]);

    return (
        <main className="min-h-screen flex">
            <div className="w-64 border-r border-gray-200 flex flex-col items-center pt-8 gap-y-16 shrink-0">
                <p className="font-bold text-xl">Admin Panel</p>
                <div className="flex flex-col gap-6 text-center w-full">
                    <DashboardSidebarItem href="/admin/create-opening">Create Opening</DashboardSidebarItem>
                    <DashboardSidebarItem href="/admin/display-openings">Display Openings</DashboardSidebarItem>
                    <DashboardSidebarItem href="/admin/add-company">Add Company</DashboardSidebarItem>
                    <DashboardSidebarItem href="/admin/display-companies">Display Companies</DashboardSidebarItem>
                </div>
            </div>
            <div className="grow">
                <nav className="h-[80px] w-full border-b border-gray-200 flex items-center justify-between px-20">
                    <div className="logo"></div>
                    <ul className="flex list-none gap-20">
                        <li>Home</li>
                        <li>Admin</li>
                        <li>About Us</li>
                    </ul>
                    <div className="profile-btn h-10 w-10 aspect-square rounded-full overflow-hidden">
                        <Avatar onClick={() => getAuth(firebaseApp).signOut()}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </nav>


                {/* Display inside the data area */}
                <div className="h-[calc(100%-80px)] w-full">{children}</div>
            </div>
        </main>
    );
}


