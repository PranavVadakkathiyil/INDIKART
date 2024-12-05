import React, { useContext, useState } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menu, setmenu] = useState(false);
  const {setshowsearch,getCartCount} = useContext(ShopContext)
  return (
    <div className="flex justify-around items-center py-4">
      <div className="flex gap-2 items-center">
        <RiShoppingBag3Line className=" sm:text-[1.4rem] text-[1.2rem]" />
        <p className="logo-style sm:text-[1.4rem] text-[1.2rem] font-normal">INDIKART</p>
      </div>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center  ">
          <p>Home</p>
          <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden"  />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center ">
          <p>Collection</p>
          <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden"  />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center ">
          <p>About</p>
          <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center ">
          <p>Contact</p>
          <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <FiSearch onClick={()=>setshowsearch(true)} className="cursor-pointer sm:text-[1.4rem] text-[1.2rem]" />
        <div className="group relative">
          <Link to='/login'><CgProfile className="cursor-pointer sm:text-[1.4rem] text-[1.2rem]" /></Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 p-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 ">
              <p className="cursor-pointer hover:text-black ">My Profile</p>
              <p className="cursor-pointer hover:text-black ">Order</p>
              <p className="cursor-pointer hover:text-black ">Logout</p>
            </div>
          </div>
        </div>
        <div>
          <Link to="/cart" className=" relative">
            <BsCart3 className="sm:text-[1.4rem] text-[1.2rem]" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
        <HiMenuAlt1
          className="sm:hidden sm:text-[1.4rem] text-[1.2rem]"
          onClick={() => setmenu(true)}
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${ menu  ? 'w-full':'w-0'}`}
      >
        <div className="flex flex-col text-gray-600">
        <IoMdClose className="text-[1.5rem] m-3" onClick={()=>setmenu(false)}/>
        <NavLink to='/' onClick={()=>setmenu(false)} className='p-3 border text-center'>HOME</NavLink>
        <NavLink to='/collection' onClick={()=>setmenu(false)} className='p-3 border text-center'>COLLECTION</NavLink>
        <NavLink to='/about' onClick={()=>setmenu(false)} className='p-3 border text-center'>ABOUT</NavLink>
        <NavLink to='/contact' onClick={()=>setmenu(false)} className='p-3 border text-center'>CONTACT</NavLink>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
