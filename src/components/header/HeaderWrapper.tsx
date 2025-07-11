"use client"
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper({}) {
  const pathname = usePathname();
  if (pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/auth/forgot-password" || pathname === "/auth/reset-password") {
    return null; // Don't render header on login or register pages
  } 
  return <Header />; 
}
