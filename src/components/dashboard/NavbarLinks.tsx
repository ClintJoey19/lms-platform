"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const NavbarLinks = () => {
  const pathname = usePathname();

  const isTeacher = pathname?.startsWith("/teacher");
  const isPlayer = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacher || isPlayer ? (
        <Button asChild variant="ghost" size="sm">
          <Link href="/" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Exit
          </Link>
        </Button>
      ) : (
        <Button asChild variant="ghost" size="sm">
          <Link href="/teacher/courses">Teacher mode</Link>
        </Button>
      )}
      <UserButton />
    </div>
  );
};

export default NavbarLinks;
