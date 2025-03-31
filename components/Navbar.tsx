import React from "react";
import { FaUser } from "react-icons/fa";
import AuthPopup from "./AuthPopup";
import DropdownNav from "./ui/DropdownNav";
const Navbar = () => {
  return (
    <div className="w-screen bg-dark shadow-md flex items-center justify-center relative">
      {/* Wrapper for Image & Links */}
      <div className="relative">
        <img src="/vector/navbar.png" alt="Navbar" className="h-18 lg:h-28" />

        {/* Links Positioned Over Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6">
          <div className="flex justify-between gap-7 items-center">
            <a
              href="/dashboard"
              className="text-black font-bold hover:text-gray-700 text-lg md:text-xl lg:text-3xl"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-black font-bold hover:text-gray-700 text-lg md:text-xl lg:text-3xl"
            >
              Apps
            </a>
            <AuthPopup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
