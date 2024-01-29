import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthUserProvider } from "@/context/authContext";
// import { AuthContextProvider } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Placement System",
  description: "Campus Placement System for 3rd Year Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
