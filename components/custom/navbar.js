"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  return (
    <div>
      <nav className="w-full bg-gradient-to-r from-purple-800 via-blue-800 to-black  shadow-lg">
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          {/* LOGO */}
          <div className="flex items-center justify-between py-2 md:py-4 w-full md:w-auto">
            <Link href="/">
              <h2 className="text-3xl text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition">MockMate</h2>
            </Link>
          </div>

          {/* GET STARTED BUTTON */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
