import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarLinks from "./SidebarLinks";
import Logo from "../global/Logo";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-opacity">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-6 px-0">
        <Logo />
        <SidebarLinks />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
