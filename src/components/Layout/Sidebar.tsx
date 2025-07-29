import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SidebarProps } from "../../types";
import useGetCategoryList from "../../hooks/servicecalls/useGetCategoryList";

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { menuItems } = useGetCategoryList();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeOnMobileClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      shadow-lg md:shadow-none md:w-64`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
              state={{ category: item.title }}
                to={item.path}
                onClick={closeOnMobileClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? darkMode
                        ? "bg-blue-900 text-white"
                        : "bg-blue-100 text-blue-800"
                      : darkMode
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
