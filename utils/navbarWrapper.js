"use client"; // Mark this component as a client component

import Navbar from "@components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Conditionally render the Navbar only if the path is not '/'
  return pathname !== "/" ? <Navbar /> : null;
}