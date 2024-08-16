"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Logo from "@images/logo.JPG";
import { navLinks } from "@utils/navLinks";
import Link from "next/link";
import Button from "@components/Button";
import { signOut } from "next-auth/react";
import { CircleSpinner } from "react-spinners-kit";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  
  const handleNavDisplay = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = (e) => {
    setIsLoggingOut(true);
    e.preventDefault();
    signOut({ callbackUrl: "/" });
    setIsLoggingOut(false);
  };

  const closeNav = () => {
    setTimeout(() => {
      setIsNavOpen(false);
    }, 300);
  };

  return (
    <nav className="nav padding relative">
      <div className="overflow-hidden flex items-center">
        <Image src={Logo} alt="logo" width={135} layout="" className="rounded-md h-auto" />
      </div>
      <button
        className="md:hidden flex"
        onClick={handleNavDisplay}
        onBlur={closeNav}
      >
        <div className="flex items-center rotate-180 cursor-pointer">
          <i className="fi fi-rr-bars-sort text-2xl flex items-center"></i>
        </div>
      </button>
      <div className="hidden md:flex">
        <div className="flex items-center justify-center gap-3">
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`${
                pathname === link.href ? "text-red" : "text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div>
            {isLoggingOut ? (
              <div className="flex items-center gap-3 justify-center ml-5">
                <CircleSpinner size={20} color="#d90f0f" />
              </div>
            ) : (
              <Button
                style="btn-2"
                text={"Logout"}
                icon={"exit"}
                type={"button"}
                onclick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed top-full right-0 w-full h-fit z-99">
          <div className="flex flex-col items-center justify-center w-full h-full">
            {navLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={`${
                  pathname === link.href ? "text-red" : "text-black"
                } border-b w-full uppercase py-3 padding bg-white font-semibold duration-200`}
                onClick={handleNavDisplay}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
