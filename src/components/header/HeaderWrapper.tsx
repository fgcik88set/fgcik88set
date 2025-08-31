"use client"
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper({}) {
  const pathname = usePathname();
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/studio")
  ) {
    return null; // Don't render header on login, register, or any studio pages
  }
  return <Header />;
}
