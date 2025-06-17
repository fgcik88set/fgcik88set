"use client"
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper({}) {
  const pathname = usePathname();
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return null; // Don't render header on login or register pages
  } 
  return <Header />; 
}
