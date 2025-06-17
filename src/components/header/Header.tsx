"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/FGCIK-Logo-Final.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Define dropdown state type
type DropdownState = {
  executives: boolean;
  board: boolean;
  more: boolean;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [dropdownsOpen, setDropdownsOpen] = useState<DropdownState>({
    executives: false,
    board: false,
    more: false
  });
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownsOpen({ executives: false, board: false, more: false });
  };

  const toggleDropdown = (dropdown: keyof DropdownState) => {
    setDropdownsOpen(prev => ({
      executives: false,
      board: false,
      more: false,
      [dropdown]: !prev[dropdown]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setDropdownsOpen({ executives: false, board: false, more: false });
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownsOpen({ executives: false, board: false, more: false });
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/about", label: "About" },
    {
      id: 3,
      href: "#",
      label: "Executives",
      dropdownKey: "executives" as const,
      dropdownItems: [
        { id: 31, href: "/executives", label: "Current Executives" },
        { id: 32, href: "/executives#past", label: "Past Executives" }
      ]
    },
    {
      id: 4,
      href: "#",
      label: "Board of Trustees",
      dropdownKey: "board" as const,
      dropdownItems: [
        { id: 41, href: "/board-of-trustees", label: "Current Board of Trustees" },
        { id: 42, href: "/board-of-trustees#past", label: "Past Boards" }
      ]
    },
    {
      id: 5,
      href: "#",
      label: "More",
      dropdownKey: "more" as const,
      dropdownItems: [
        { id: 51, href: "/moments", label: "Moments" },
        { id: 52, href: "/memorabilia", label: "Memorabilia" },
        { id: 53, href: "/events", label: "Events" }
      ]
    }
  ];

  const isLoggedIn: boolean = false;
  const activeLinkStyle = "text-mainYellow font-semibold";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-300 transition-all duration-300 ${
        isScrolled
          ? "border-b-0 bg-darkBlue text-white shadow-md"
          : "bg-white text-black"
      }`}
    >
      <div className="w-full lg:w-[95%] mx-auto">
        <nav className="flex justify-between items-center h-[10vh] md:h-[12vh] px-4">
          <Link href="/" className="flex items-center gap-2 w-1/4 md:w-1/6">
            <Image
              src={logo}
              alt="FGCIK Logo"
              className="w-auto h-12 object-contain"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden z-50 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <MdClose className="h-8 w-8 text-red-500" />
            ) : (
              <GiHamburgerMenu className="h-8 w-8" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full lg:w-[70%]">
            <div className="flex w-[70%] justify-between items-center font-medium">
              {navLinks.map((link) => (
                <div key={link.id} className="relative">
                  {link.dropdownKey ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.dropdownKey!)}
                        className={`flex items-center gap-1 transition-colors ${
                          pathname.startsWith(`/${link.dropdownKey}`) 
                            ? activeLinkStyle 
                            : isScrolled 
                              ? "text-white hover:text-gray-300" 
                              : "text-black hover:text-darkBlue"
                        }`}
                      >
                        {link.label}
                        {dropdownsOpen[link.dropdownKey] ? (
                          <IoIosArrowUp className="h-4 w-4" />
                        ) : (
                          <IoIosArrowDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      {dropdownsOpen[link.dropdownKey] && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                pathname === item.href
                                  ? activeLinkStyle
                                  : "text-gray-800"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`transition-colors ${
                        pathname === link.href
                          ? activeLinkStyle
                          : isScrolled
                          ? "text-white hover:text-gray-300"
                          : "text-black hover:text-darkBlue"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <Link
              href={isLoggedIn ? "#" : "/register"}
              className="w-40 bg-darkBlue text-sm py-3 px-6 border rounded-full text-white hover:bg-opacity-90 transition-colors text-center"
            >
              {isLoggedIn ? "Payment" : "Register"}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-darkBlue text-white transform transition-transform duration-300 ease-in-out pt-[10vh] ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-6 p-4 overflow-y-auto h-[90vh]">
            {navLinks.map((link) => (
              <div key={link.id} className="border-b border-gray-700 pb-4">
                {link.dropdownKey ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.dropdownKey!)}
                      className="flex items-center justify-between w-full text-left py-2"
                    >
                      <span className={`${pathname.startsWith(`/${link.dropdownKey}`) ? activeLinkStyle : "text-white"}`}>
                        {link.label}
                      </span>
                      {dropdownsOpen[link.dropdownKey] ? (
                        <IoIosArrowUp className="h-5 w-5" />
                      ) : (
                        <IoIosArrowDown className="h-5 w-5" />
                      )}
                    </button>
                    
                    {dropdownsOpen[link.dropdownKey] && (
                      <div className="mt-2 pl-4 space-y-3">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`block py-2 ${
                              pathname === item.href
                                ? activeLinkStyle
                                : "text-gray-300 hover:text-white"
                            }`}
                            onClick={toggleMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 ${
                      pathname === link.href
                        ? activeLinkStyle
                        : "text-white hover:text-gray-300"
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            <Link
              href="/register"
              className="w-full bg-white text-darkBlue py-3 px-6 rounded-full text-center font-medium hover:bg-gray-100 mt-4"
              onClick={toggleMenu}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}