"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
    const { setOpenMobile, isMobile, openMobile } = useSidebar();

    const closeSidebar = () => {
        if (isMobile && openMobile) {
            setOpenMobile(!openMobile);
        }
    };
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/todos", label: "Todos" },
    ];
    return (
        <Sidebar className="z-9999">
            <SidebarHeader className="p-4 font-bold text-lg">
                Admin Dashboard
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton className={pathname === `${item.href}` ? "dark:bg-gray-700 bg-gray-300" : ""} asChild onClick={closeSidebar}>
                                    <Link href={item.href}>{item.label}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 text-sm text-muted-foreground">
                <SignedIn>
                    <UserButton />
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
            .cl-internal-l2l775,
            .cl-internal-pe6vm4 {
              display: none !important;
              }
              `,
                        }}
                    />
                </SignedIn>
                <p>All Right Reversed @ 2026</p>
            </SidebarFooter>
        </Sidebar >
    );
}
