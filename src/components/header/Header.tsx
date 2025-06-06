"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/FGCIK-Logo-Final.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isExecutivesDropdownOpen, setIsExecutivesDropdownOpen] =
    useState<boolean>(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close dropdown when mobile menu is toggled
    setIsExecutivesDropdownOpen(false);
  };

  const toggleExecutivesDropdown = () => {
    setIsExecutivesDropdownOpen(!isExecutivesDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExecutivesDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when navigating to a new page
  useEffect(() => {
    setIsExecutivesDropdownOpen(false);
    setIsMenuOpen(false);
  }, [pathname]); // Corrected dependency array

  const navLinks = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/about", label: "About" },
    {
      id: 3,
      href: "#",
      label: "Executives",
      hasDropdown: true,
      dropdownItems: [
        { id: 10, href: "/executives", label: "All Executives" },
        { id: 11, href: "/board-of-trustees", label: "Board of Trustees" },
      ],
    },
    { id: 4, href: "/moments", label: "Moments" },
    { id: 5, href: "/memorabilia", label: "Memorabilia" },
    { id: 6, href: "/events", label: "Events" },
  ];

  const isLoggedIn: boolean = false;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-300 transition-all duration-300  ${
        isScrolled
          ? "border-b-0 bg-darkBlue text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="w-full lg:w-[95%] mx-auto">
        <nav
          className={`flex justify-between items-center h-[10vh] md:h-[12vh] rounded-lg px-4 md:px-0 ${
            isScrolled ? "shadow-md text-white" : ""
          }`}
        >
          <div className="flex items-center gap-2 w-[18%] md:w-[6%]">
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              
            />
          </div>

          {/* Hamburger menu for mobile */}
          
          <button className="lg:hidden z-50" onClick={toggleMenu}>
            {isMenuOpen ? (
              <MdClose className="h-8 w-8" color="red" />
            ) : (
              <GiHamburgerMenu className="h-8 w-8" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-between w-full lg:w-[70%]">
            <div className="lg:flex w-3/4 justify-between items-center font-medium text-black">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.id} className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleExecutivesDropdown}
                      className={`flex items-center gap-1 transition-colors ${
                        pathname.includes("/executives") ||
                        pathname.includes("/board-of-trustees")
                          ? "text-mainYellow font-semibold"
                          : isScrolled
                          ? "text-white"
                          : "text-black hover:text-darkBlue"
                      }`}
                    >
                      {link.label}
                      {isExecutivesDropdownOpen ? (
                        <IoIosArrowUp className="h-4 w-4" />
                      ) : (
                        <IoIosArrowDown className="h-4 w-4" />
                      )}
                    </button>

                    {/* Desktop dropdown menu */}
                    {isExecutivesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-50">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`block px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-[18px] ${
                              pathname === item.href
                                ? "text-mainYellow font-semibold"
                                : isScrolled
                                ? "text-white"
                                : "text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`transition-colors ${
                      pathname === link.href
                        ? "text-mainYellow font-semibold"
                        : isScrolled
                        ? "text-white"
                        : "text-black hover:text-darkBlue"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <Link
              href={isLoggedIn ? "#" : "#"}
              className="hidden w-40 lg:block bg-darkBlue text-sm py-4 px-6 border rounded-full text-white hover:bg-opacity-90 transition-colors text-[18px] text-center"
            >
              {isLoggedIn ? "Payment" : "Register"}
            </Link>
          </div>
        </nav>

        {/* Mobile slide-down menu */}
        <div
          className={`fixed top-0 left-0 w-full h-auto bg-darkBlue text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-y-[10vh]" : "translate-y-[-100%]"
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-6 p-4 pt-6">
            <div className="flex flex-col items-center space-y-6 font-medium">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.id}
                    className="w-full flex flex-col items-center"
                  >
                    <button
                      onClick={toggleExecutivesDropdown}
                      className={`flex items-center gap-1 transition-colors ${
                        pathname.includes("/executives") ||
                        pathname.includes("/board-of-trustees")
                          ? "text-mainYellow font-semibold"
                          : isScrolled
                          ? "text-white"
                          : "text-white hover:text-darkBlue"
                      }`}
                    >
                      {link.label}
                      {isExecutivesDropdownOpen ? (
                        <IoIosArrowUp className="h-4 w-4" />
                      ) : (
                        <IoIosArrowDown className="h-4 w-4" />
                      )}
                    </button>

                    {/* Mobile dropdown menu */}
                    {isExecutivesDropdownOpen && (
                      <div className="mt-2 flex flex-col items-center space-y-3 py-2">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`text-sm transition-colors ${
                              pathname === item.href
                                ? "text-mainYellow font-semibold"
                                : isScrolled
                                ? "text-white"
                                : "text-white hover:text-darkBlue"
                            }`}
                            onClick={toggleMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`transition-colors ${
                      pathname === link.href
                        ? "text-mainYellow font-semibold"
                        : isScrolled
                        ? "text-white"
                        : "text-white hover:text-darkBlue"
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <Link
              href="#"
              className="w-full bg-darkBlue text-sm py-3 px-6 border rounded-full text-white hover:bg-opacity-90 transition-colors text-center"
              onClick={toggleMenu}
            >
              Finance
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
