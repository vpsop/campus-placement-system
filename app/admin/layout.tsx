"use client";

import AdminDashboardWrapper from "@/components/DashboardWrapper";

interface AdminLayoutProps {
    children: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {

    return (
        <AdminDashboardWrapper>
            {children}
        </AdminDashboardWrapper>
    );
}


