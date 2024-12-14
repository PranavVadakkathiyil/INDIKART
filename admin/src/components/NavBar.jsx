import React from 'react'
import { FiShoppingBag } from "react-icons/fi";

const NavBar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='flex items-center gap-4'>
        <FiShoppingBag className='text-[max(40px)]'/>
        <p className='text-[1.2rem] font-semibold'>Admin Pannel</p>
        </div>

        <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full '>Logout</button>
    </div>
  )
}
 
export default NavBar