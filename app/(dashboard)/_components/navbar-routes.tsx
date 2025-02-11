"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isPlayerPage = pathname?.startsWith("/jobs");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isAdminPage || isPlayerPage ? (
        <Link href="/">
          <Button
            variant={"outline"}
            size={"sm"}
            className="border-purple-700/20"
          >
            <LogOut />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/admin/jobs">
        <Button
          variant={"outline"}
          size={"sm"}
          className="border-purple-700/20"
        >
          <LogOut />
          Admin Mode
        </Button>
      </Link>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
