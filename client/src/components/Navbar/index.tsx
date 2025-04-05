import React from 'react'
import {Menu, Search,Settings} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'


const Navbar = () => {
  const dispatch= useAppDispatch();
  const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);

  return (
    <div className='flex  items-center justify-between p-4'>
      {/* Search Bar */}
      {/* Closing Button */}
      <div className='flex items-center  gap-8'>
        {!isSidebarCollapsed?null:(
          <button onClick={()=>dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>

            <Menu className='h-8 w-8 cursor-pointer '></Menu>
          </button>
        )}

       <div className='relative flex h-min w=[200px]'> 
        <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 cursor-pointer'></Search>
        <input className='w-full rounded border-none bg-gray-100 outline-1   p-2 pl-8 focus:bg-white focus:border' placeholder='Search...' type="search" />
      </div>
      </div>
      {/* Icons */}
      <div className='flex items-center'>
      <Link href="/settings" className='h-min w-min rounded p-2 hover:scale-125 transition-all'>
      <Settings className='h-6 w-6 cursor-pointer'></Settings>
      </Link>
      <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] md:inline-block bg-gray-200'>
      
      </div>
      </div>
      </div>
  )
}

export default Navbar