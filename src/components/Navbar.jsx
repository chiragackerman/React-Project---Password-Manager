import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-black text-white flex justify-between items-center p-4 px-7 mb-2">
      <div className="logo text-2xl font-bold">
        <span className="text-green-600">&lt;</span>
        Pass
        <span className="text-green-600">Man/&gt;</span>
      </div>
      <div className="text-lg font-semibold flex gap-7">
          <a href="https://github.com/chiragackerman/React-Project---Password-Manager" className='flex cursor-pointer font-bold items-center justify-center gap-2 bg-white text-black p-2 px-3 rounded-xl'>
            <img src="/icons/github.svg" alt="github" className='invert w-7' />
            <span>GitHub</span>
          </a>
      </div>
    </nav>
  )
}

export default Navbar
