"use client";

import Link from "next/link";
import { useState } from "react";
import { footerSections } from "../constants/data";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import logo from "../../../public/logo/FGCIK-Logo-Final.png";
import { useAuth } from "@/providers/session-provider";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
   const { status } = useAuth();

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-darkBlue text-white pb-6 pt-6">
      <div className="w-full lg:w-[95%] mx-auto">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-6">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              width={70}
              height={100}
              className="bg-white rounded-full"
            />
            <p className="text-white max-w-xs text-center lg:text-left">
              Fostering community, preserving heritage, and building a brighter
              future together.
            </p>
          </div>

          {/* Main footer links - desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.id}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-white hover:text-mainYellow transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full flex-col justify-between lg:w-auto">
            <div>
              <h3 className="text-xl font-semibold text-center lg:text-left">
                Stay Connected
              </h3>
              <p className="text-white text-sm">
                For Dues,Registration and welfare related activities payment{" "}
              </p>
            </div>
            <br />
            <div className="flex items-center lg:items-start">
              <Link
                href={
                  status === "authenticated" ? "/payment" : "/auth/register"
                }
                className="w-fit text-sm text-center bg-white text-darkBlue px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Make Payment
              </Link>
            </div>
          </div>
        </div>
        <br className="md:hidden" />

        {/* Main footer links - mobile accordion */}
        <div className="lg:hidden">
          {footerSections.map((section) => (
            <div key={section.id} className="">
              <button
                className="w-full py-4 flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <h4 className="font-semibold">{section.title}</h4>
                {expandedSection === section.id ? (
                  <IoIosArrowUp className="h-5 w-5 text-white" />
                ) : (
                  <IoIosArrowDown className="h-5 w-5 text-white" />
                )}
              </button>

              {expandedSection === section.id && (
                <ul className="space-y-2 pb-4">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white hover:text-mainYellow transition-colors"
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
        <div className="py-4 flex flex-col md:flex-row justify-center items-center gap-6 border-t border-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-white">
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
