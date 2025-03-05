"use client";

import Link from "next/link";
import { useState } from "react";
import { footerSections } from "../constants/data";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import logo from "../../../public/logo/FGCIK-Logo-Final.webp";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-offBlack text-white pt-12 pb-6">
      <div className="w-full lg:w-[95%] mx-auto px-4">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              width={70}
              height={100}
            />
            <p className="text-gray-400 max-w-xs text-center lg:text-left">
              Fostering community, preserving heritage, and building a brighter
              future together.
            </p>
          </div>

          {/* Main footer links - desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-8 py-8 border-t border-b border-gray-800">
            {footerSections.map((section) => (
              <div key={section.id}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-mainYellow transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-auto">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Stay Connected
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-darkBlue w-full sm:w-64"
              />
              <button className="bg-darkBlue text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main footer links - mobile accordion */}
        <div className="lg:hidden border-t border-gray-800">
          {footerSections.map((section) => (
            <div key={section.id} className="border-b border-gray-800">
              <button
                className="w-full py-4 flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <h4 className="font-semibold">{section.title}</h4>
                {expandedSection === section.id ? (
                  <IoIosArrowUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <IoIosArrowDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <ul className="space-y-2 pb-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-mainYellow transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Social links and copyright */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-gray-400">
            <p>© {currentYear} FGCIK. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-mainYellow transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-mainYellow transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
