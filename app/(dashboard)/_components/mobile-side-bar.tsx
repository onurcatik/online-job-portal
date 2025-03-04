"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarRoutes } from "@/app/(dashboard)/_components/sidebar-routes";

export const ResponsiveSidebar = () => {
  return (
    <>
      {/* Mobil görünüm: md ekran boyutundan küçük */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="pr-4 hover:opacity-75 transition">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>

      {/* Masaüstü görünüm: md ve üstü */}
      <div className="hidden md:flex">
        <SidebarRoutes />
      </div>
    </>
  );
};
