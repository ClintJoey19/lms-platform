"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();
  const isTeacher = pathname?.includes("/teacher");
  const routes = isTeacher ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        const isActive =
          (pathname === "/" && route.href === "/") ||
          pathname === route.href ||
          pathname?.startsWith(`${route.href}/`);
        return (
          <Link
            key={route.label}
            href={route.href}
            className={`flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 py-4 transition-all hover:text-slate-600 hover:bg-slate-300-20 ${
              isActive &&
              "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-r-4 border-sky-700"
            }`}
          >
            <route.icon className={isActive ? "text-sky-700" : ""} />{" "}
            <p className={isActive ? "text-sky-700" : ""}>{route.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
