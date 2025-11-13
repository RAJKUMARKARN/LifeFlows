import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-[#ee0979] to-[#ff6a00] text-white flex flex-col transition-width duration-300 h-screen fixed top-0 left-0 ${
          isOpen ? "w-64" : "w-12"
        }`}
      >
        <div className="flex items-center justify-end p-4 mt-[10px]">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <nav className="mt-4 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-4 hover:bg-[#BF2935] transition-colors duration-200 ${
                  isActive ? "bg-[#6E141B]" : ""
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`ml-2 ${!isOpen && "hidden"}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 flex-1 p-6 ${
          isOpen ? "ml-64" : "ml-12"
        } overflow-auto h-screen`}
      >
        {children}
      </div>
    </div>
  );
}
