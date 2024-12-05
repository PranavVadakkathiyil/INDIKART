import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Search = () => {
    const {search,setsearch,showsearch,setshowsearch} = useContext(ShopContext);
    const [visible, setvisible] = useState(false)
    const location = useLocation()
    useEffect(() => {
    //  console.log(location.pathname)
    if (location.pathname.includes('collection'))
    {
        setvisible(true)
    }
    else{
        setvisible(false)
    }
      
    }, [location])
    
  return showsearch  && visible  ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div  className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
            <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'  />
            <CiSearch className='text-[1.3rem]' />

        </div>
        <IoIosClose className='inline text-[1.3rem]  cursor-pointer ' onClick={()=>setshowsearch(false)}/>

    </div>
  ): null
}

export default Search