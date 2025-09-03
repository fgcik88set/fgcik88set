"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/FGCIK-Logo-Final.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuth } from "@/providers/session-provider";
import { CircleUser, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

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
    more: false,
  });
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const { user, status } = useAuth();

  const getPageTitle = (path: string): string => {
    switch (path) {
      // case "/":
      //   return "Welcome to FGC Ikot Ekpene Class of '88";
      // case "/about":
      //   return "About Our Alumni Association";
      case "/executives/current":
        return "Current Executives";
      case "/executives/past":
        return "Past Executives";
      case "/board-of-trustees/current":
        return "Current Board of Trustees";
      case "/board-of-trustees/past":
        return "Past Board of Trustees";
      case "/moments":
        return "Our Memorable Moments";
      case "/memorabilia":
        return "Alumni Memorabilia";
      case "/events":
        return "Events";
      default:
        return "";
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownsOpen({ executives: false, board: false, more: false });
  };

  const toggleDropdown = (dropdown: keyof DropdownState) => {
    setDropdownsOpen((prev) => ({
      executives: false,
      board: false,
      more: false,
      [dropdown]: !prev[dropdown],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
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
      label: "BOT",
      dropdownKey: "board" as const,
      dropdownItems: [
        {
          id: 31,
          href: "/board-of-trustees/current",
          label: "Current Board of Trustees",
        },
        { id: 32, href: "/board-of-trustees/past", label: "Past Boards" },
      ],
    },
    {
      id: 4,
      href: "#",
      label: "EXCO",
      dropdownKey: "executives" as const,
      dropdownItems: [
        { id: 41, href: "/executives/current", label: "Current Executives" },
        { id: 42, href: "/executives/past", label: "Past Executives" },
      ],
    },
    { id: 5, href: "/moments", label: "Moments" },
    { id: 6, href: "/memorabilia", label: "Memorabilia" },
    { id: 7, href: "/events", label: "Events" },
  ];

  const isActivePath = (currentPath: string, basePath: string) => {
    if (basePath === "/") return currentPath === basePath;
    return currentPath === basePath || currentPath.startsWith(basePath + "/");
  };

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
      <div className="w-full">
        <nav className="flex justify-between items-center h-[10vh] md:h-[12vh] px-4 py-2 relative">
          <Link
            href="/"
            className="flex items-center gap-2 w-[15%] md:w-[6%] bg-white rounded-full"
          >
            <Image src={logo} alt="FGCIK Logo" priority />
          </Link>

          {/* Centered Page Title - Only visible when scrolled */}
          {isScrolled && getPageTitle(pathname) !== "" && (
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -bottom-1/2 items-center justify-center z-10 bg-darkBlue px-6 py-2 shadow-lg">
              <div className="text-xl md:text-xl font-semibold text-center transition-all duration-300 text-white">
                {getPageTitle(pathname)}
              </div>
            </div>
          )}

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
            <div className="flex w-[80%] justify-between items-center font-medium">
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
                        isActivePath(pathname, link.href)
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
            <div className="flex items-center gap-4">
              <Link
                href={status === "authenticated" ? "/payment" : "/auth/login"}
                className="w-30 bg-darkBlue text-sm py-3 px-6 border rounded-full text-white hover:bg-opacity-90 transition-colors text-center"
              >
                Payment
              </Link>
              {status === "authenticated" && (
                <div className="relative">
                  <CircleUser
                    onClick={() => setOpenProfile(!openProfile)}
                    className={`h-8 w-8 ${
                      isScrolled ? "text-white" : "text-darkBlue"
                    }  cursor-pointer`}
                  />
                  {openProfile && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <User className={`h-5 w-5 text-darkBlue`} />
                        <p className="text-darkBlue font-medium">
                          {user?.name}
                        </p>
                      </div>
                      <hr />
                      <div
                        onClick={() => signOut()}
                        className="flex items-center gap-2 mt-4 cursor-pointer"
                      >
                        <LogOut className="h-5 w-5 text-red-500 cursor-pointer" />
                        <p className="text-red-500 font-medium">Logout</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-darkBlue text-white transform transition-transform duration-300 ease-in-out pt-[10vh] ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          } lg:hidden z-40`}
        >
          {status === "authenticated" && (
            <div className="absolute top-8 left-4 flex items-center gap-2 mb-4">
              <User className={`h-5 w-5 text-white`} />
              <p className="text-white text-lg font-medium">{user?.name}</p>
            </div>
          )}
          <div className="flex flex-col gap-6 p-4 overflow-y-auto h-full md:h-[90vh]">
            {navLinks.map((link) => (
              <div key={link.id} className="border-b border-gray-700 pb-4">
                {link.dropdownKey ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.dropdownKey!)}
                      className="flex items-center justify-between w-full text-left py-2"
                    >
                      <span
                        className={`${
                          pathname.startsWith(`/${link.dropdownKey}`)
                            ? activeLinkStyle
                            : "text-white"
                        }`}
                      >
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
                      isActivePath(pathname, link.href)
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
              href={status === "authenticated" ? "/payment" : "/auth/login"}
              className="w-full bg-white text-darkBlue py-3 px-6 rounded-full text-center font-medium hover:bg-gray-100 mt-4"
              onClick={toggleMenu}
            >
              Payment
            </Link>

            {status === "authenticated" && (
              <div
                onClick={() => signOut()}
                className="w-full bg-white flex items-center gap-2 cursor-pointer py-3 px-6 rounded-full justify-center"
              >
                <LogOut className="h-5 w-5 text-red-500 cursor-pointer" />
                <p className="text-red-500 font-medium">Logout</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
