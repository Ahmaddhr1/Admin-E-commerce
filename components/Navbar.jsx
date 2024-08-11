"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@images/logo.JPG";
import { navLinks } from "@utils/navLinks";
import Link from "next/link";
import Button from "@components/Button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [selectedLink, setSelectedLink] = useState("Dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavDisplay = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="nav padding relative">
      <div className="overflow-hidden flex items-center">
        <Image src={Logo} alt="logo" width={135} className="rounded-md" />
      </div>
      <div className="md:hidden flex" onClick={handleNavDisplay}>
        <div className="flex items-center rotate-180 cursor-pointer">
          <i className="fi fi-rr-bars-sort text-2xl flex items-center"></i>
        </div>
      </div>
      <div className="hidden md:flex">
        <div className="flex items-center justify-center gap-3">
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`${
                selectedLink === link.label ? "text-red" : "text-black"
              }`}
              onClick={(e) => {
                setSelectedLink(link.label);
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            style="btn-2"
            text={"Logout"}
            icon={"exit"}
            type={"button"}
            onclick={handleLogout}
          />
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed top-full right-0 w-full h-fit 0 z-50">
          <div className="flex flex-col items-center justify-center w-full h-full">
            {navLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={`${
                  selectedLink === link.label ? "text-red" : "text-black"
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
