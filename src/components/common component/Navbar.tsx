import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", key: "home" as const, path: "/" },
    { name: "About", key: "about" as const, path: "/about" },
    { name: "Courses", key: "courses" as const, path: "/courses" },
    { name: "Event Gallery", key: "gallery" as const, path: "/gallery" },
    { name: "Contact", key: "contact" as const, path: "/contact" },
  ];

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path === "/about") return "about";
    if (path === "/courses") return "courses";
    if (path === "/gallery") return "gallery";
    if (path === "/contact") return "contact";
    return "home";
  };

  const activeKey = getActiveKey();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        <div className="flex flex-col items-center py-6">
          <ul className="flex space-x-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            {navLinks.map((link) => {
              const navigateTo = () => {
                navigate(link.path);
                window.scrollTo({ top: 0, behavior: "smooth" });
              };

              const isActive = link.key === activeKey;

              return (
                <li key={link.name}>
                  <button
                    onClick={navigateTo}
                    className={`transition-colors duration-200 hover:text-[#111214] uppercase font-bold tracking-[0.2em] cursor-pointer outline-none pb-1 ${
                      isActive ? "text-primary border-b-2 border-primary" : ""
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
