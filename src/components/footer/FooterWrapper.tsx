"use client";
import { usePathname } from "next/navigation";

import Footer from "./Footer";

export default function FooterWrapper({}) {
  const pathname = usePathname();
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/studio")
  ) {
    return null; // Don't render header on login or register pages
  }
  return <Footer />;
}
