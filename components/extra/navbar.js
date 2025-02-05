import React from 'react'
import Link from 'next/link'
const  Navbar = () => {
  return (
    <div>
    <nav className="w-full from-purple-800 z-[999]">
      <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:py-4 w-full md:w-auto">
          <Link href="/">
            <h2 className="text-3xl text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition">MockMate</h2>
          </Link>
        </div>

      
      </div>
    </nav>
  </div>
  )
}

export default Navbar
