import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarItemProps {
  href: string;
  children: React.ReactNode;  
}

export default function DashboardSidebarItem({href, children}: DashboardSidebarItemProps) {
  const currentRoute = usePathname();
  return (
    <Link href={href} className={
      cn(
          "px-4 py-[10px] mx-2",
          currentRoute === href ? "bg-blue-600 text-white rounded-full" : ""
      )
  }>{children}</Link>
  );
}