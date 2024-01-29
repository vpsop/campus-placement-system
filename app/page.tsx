"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => { 
        router.push("/student-dashboard");
       }}>Got to Dashboard</Button>
    </main>
  );
}


