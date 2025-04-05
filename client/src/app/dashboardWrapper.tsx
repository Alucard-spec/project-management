"use client"

import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/Sidebar'
import StoreProvider,{useAppSelector} from './redux'



const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);

  

  return (
    <div className='flex min-h-screen w-full bg-blue-300'>
        {/*side bar*/}
        <SideBar/>
        <main className={`flex w-full flex-col bg-gray-100 ${isSidebarCollapsed?"":"md:pl-64"}`}> 
            
            <Navbar/>
            {children}
        </main>

    </div>
    
  )
}

const DashboardWrapper=({children}:{children:React.ReactNode})=>{
  return(
    <StoreProvider>
      <DashboardLayout> {children} </DashboardLayout>
    </StoreProvider>
  )
}
export default DashboardWrapper;
