"use client";

import { usePathname } from 'next/navigation';
import MenuNavbar from "@/components/MenuNavbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <MenuNavbar />}
      {children}
    </>
  );
}
