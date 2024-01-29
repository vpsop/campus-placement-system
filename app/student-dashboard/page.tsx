"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import { getAuth } from "firebase/auth";
import firebaseApp from "@/firebase/config";

export default function StudentDashboard() {

	const user = useAuthContext();
	const router = useRouter();

	console.log(user);
	
	React.useEffect(() => {
		// If user is not logged in then then redirect to login page
		if (user.authUser === null) router.push("/login");
	}, [user, router]);
	
	
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Button onClick={() => {getAuth(firebaseApp).signOut()}}>Log out<ExitIcon className="ml-2"/></Button>
		</main>
	);
}

