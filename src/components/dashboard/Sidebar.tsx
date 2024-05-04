import React from "react";
import Logo from "../global/Logo";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div>
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
