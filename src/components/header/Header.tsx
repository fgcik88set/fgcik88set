"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import logo from "../../../public/logo/FGCIK-Logo-Final.webp"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdClose } from "react-icons/md"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isExecutivesDropdownOpen, setIsExecutivesDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close dropdown when mobile menu is toggled
    setIsExecutivesDropdownOpen(false)
  }

  const toggleExecutivesDropdown = () => {
    setIsExecutivesDropdownOpen(!isExecutivesDropdownOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExecutivesDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown when navigating to a new page
  useEffect(() => {
    setIsExecutivesDropdownOpen(false)
    setIsMenuOpen(false)
  }, []) //Corrected dependency array

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "About" },
    {
      href: "#",
      label: "Executives",
      hasDropdown: true,
      dropdownItems: [
        { href: "#", label: "All Executives" },
        { href: "#", label: "Board of Trustees" },
      ],
    },
    { href: "#", label: "Memorabilia" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-300 transition-all duration-300  ${
        isScrolled ? "backdrop-blur-sm border-b-0 bg-offBlack/80" : "bg-black"
      }`}
    >
      <div className="w-full lg:w-[95%] mx-auto">
        <nav className={`flex justify-between items-center h-[12vh] rounded-lg px-4 ${isScrolled ? "shadow-md" : ""}`}>
          <div className="flex items-center gap-2">
            <Image src={logo || "/placeholder.svg"} alt="logo" width={80} height={80} layout="intrinsic" />
          </div>

          {/* Hamburger menu for mobile */}
          <button className="lg:hidden z-50" onClick={toggleMenu}>
            {isMenuOpen ? <MdClose className="h-8 w-8" color="red" /> : <GiHamburgerMenu className="h-8 w-8" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex w-[60%] text-[18px] justify-between items-center font-medium text-white">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleExecutivesDropdown}
                    className={`flex items-center gap-1 transition-colors ${
                      pathname.includes("/executives") || pathname.includes("/board-of-trustees")
                        ? "text-mainYellow font-semibold"
                        : "hover:text-mainYellow"
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
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-[18px] ${
                            pathname === item.href ? "text-mainYellow font-semibold" : "text-white"
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
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    pathname === link.href ? "text-mainYellow font-semibold" : "hover:text-mainYellow"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link
              href="#"
              className="hidden lg:block bg-darkBlue text-sm py-4 px-6 border rounded-full text-white hover:bg-opacity-90 transition-colors text-[18px]"
            >
              Payments
            </Link>
          </div>
        </nav>

        {/* Mobile slide-down menu */}
        <div
          className={`fixed top-0 left-0 w-full h-auto bg-offBlack shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-y-[12vh]" : "translate-y-[-100%]"
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-6 p-4 pt-6">
            <div className="flex flex-col items-center space-y-6 font-medium">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="w-full flex flex-col items-center">
                    <button
                      onClick={toggleExecutivesDropdown}
                      className={`flex items-center gap-1 transition-colors ${
                        pathname.includes("/executives") || pathname.includes("/board-of-trustees")
                          ? "text-shadeTwo"
                          : "hover:text-shadeTwo"
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
                            key={item.href}
                            href={item.href}
                            className={`text-sm transition-colors ${
                              pathname === item.href ? "text-shadeTwo font-semibold" : "hover:text-shadeTwo"
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
                    key={link.href}
                    href={link.href}
                    className={`transition-colors ${pathname === link.href ? "text-shadeTwo" : "hover:text-shadeTwo"}`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ),
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
  )
}

