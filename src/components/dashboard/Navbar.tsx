import React from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
