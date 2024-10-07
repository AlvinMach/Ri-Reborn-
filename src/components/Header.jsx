import React from 'react'

const Header = () => {
  return (
    <div class = "md:grid md:grid-cols-2 md:gap-4 m-8 flex px-[40px] flex-col-reverse">
       <div className = "flex flex-col space-y-2 justify-center ">
          <h1 className = "text-3xl mt-6 py-11 font-bold text-center  max-w-md md:text-left px-10">Welcome to Ri REBORN your trusted source for quality mines, gemstones, and protective wear. With years of experience, we deliver only the best to our customers.""</h1>
          <p className = "text-sm max-w-sm text-center px-10 mb-6 ">Experience Excellence in Mining, Gemstones, and Safety"</p>
       </div>
       <div className = "bg-cover px-4">
          <img id = "img" src = "/Logo.png"  className = "px-10 rounded-full"/>   
       </div>
    </div>
  )
}

export default Header
