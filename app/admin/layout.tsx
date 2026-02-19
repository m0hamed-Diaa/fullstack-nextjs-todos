import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen container mx-auto p-4 overflow-x-auto">
                <div>
                    <SidebarTrigger title="open sidebar" />
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
