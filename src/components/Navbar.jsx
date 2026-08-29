import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-black text-white flex justify-between items-center p-4 px-7 mb-2">
      <div className="logo text-2xl font-bold">
        <span className="text-green-600">&lt;</span>
        Pass
        <span className="text-green-600">Man/&gt;</span>
        </div>
      <ul className="nav-links text-lg font-semibold flex gap-7">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
