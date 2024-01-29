"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import signIn from "@/firebase/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import React from "react";


export default function LoginPage() {

	const user = useAuthContext();
	const router = useRouter();

	console.log(user);
	React.useEffect(() => {
		// If user is logged in redirect to the home page 
		if (user.authUser !== null) router.push("/");
	}, [user, router]);
	
	

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});


	function onSubmit(data: z.infer<typeof LoginSchema>) {
		try {
			signIn(data.email, data.password);
		} catch (err) {
			console.log(err);
		}
	}


	return (
		<main className="flex min-h-screen flex-col items-center space-y-6 p-24">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-[350px]"
				>
					<div className="space-y-6">

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											// disabled={isPending}
											placeholder="Your Email"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											// disabled={isPending}
											placeholder="Your password"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
						>
							Login
						</Button>
					</div>
				</form>

				<Link href="/signup">
					<p className="underline text-sm">Dont have an account? Create</p>
				</Link>
			</Form>
		</main>
	);
}

