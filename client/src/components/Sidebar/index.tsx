"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, HomeIcon, Icon, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, Sidebar, User, Users, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Link from 'next/link';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';

interface SidebarLinkProps{
    href:string;
    icon:LucideIcon;
    label:string;
   
}

const SideBarLink = ({
    href,
    icon:Icon,
    label,
  
}:SidebarLinkProps)=>{
    const pathname=usePathname();
    const isActive=pathname===href|| (pathname==="/" && href==="/dashboard");


    return (
        <Link href={href} className='w-full'>
            <div className={`relative flex cursor-pointer items-center gap-3 ${isActive? "bg-gray-200 text-white":""} justify-start px-8 py-3`}>

                <Icon className='h-6 w-6 text-gray-800'/>
                <span className={`font-medium text-gray-800`}>{label}</span>
            </div>

        </Link>
    )
}


const SideBar = () => {
    const [showProjects,setShowProjects] =useState(true);   
    const [showPriority,setShowPriority]=useState(true);

    const {data:projects}=useGetProjectsQuery();
    console.log(projects);

    const dispatch= useAppDispatch();
    const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);


    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all bg-white duration-300  overflow-y-auto h-full z-40 ${isSidebarCollapsed?"w-0 hidden":"w-64"}`;
  return (
    <div className={sidebarClassNames}>
        <div className='flex h-[100%] w-full flex-col justify-start'>
            {/* Top Logo */}
        <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 '>
            
            <div className='text-xl font-bold text-gray-800 '> 
              UnifyHub
            </div>
            {isSidebarCollapsed?null:(
                <button className='py-3' onClick={()=>{ dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}>
                    <X className='h-6 transition-colors cursor-pointer w-6 text-gray-800 hover:text-gray-500'/>
                </button>
            )}

        </div>
        <div>
            {/* Team */}
            <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 '> 
            <Image src="/logo.png" alt='Logo' width={40} height={40}/>
            <div>
                <h3 className='text-md font-bold tracking-wide'>
                    Team One
                </h3>
                <div className='mt-1 flex items-center gap-2'>
                    <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500'></LockIcon>
                    <p className='text-xs text-gray-500'>Private </p>

                </div>
            </div>
            </div>
            {/* Navbar Links */}
            <nav className='z-10 w-full'>
                <SideBarLink icon={HomeIcon}
                label="Home"
                href="/"
                />
                <SideBarLink icon={Briefcase}
                label="Timeline"
                href="/timeline"
                />
                <SideBarLink icon={Search}
                label="Search"
                href="/search"
                />
                <SideBarLink icon={Settings}
                label="Settings"
                href="/settings"
                />
                <SideBarLink icon={User}
                label="Users"
                href="/users"
                />
                <SideBarLink icon={Users}
                label="Team"
                href="/teams"
                />
            </nav>

            {/* Project Links */}
            <button onClick={()=>setShowProjects((prev)=>!prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                <span className=''>Projects </span>
                {showProjects?<ChevronUp className='h-5 w-5 '/>:<ChevronDown className='h-5 w-5 '/>}
            </button>
            
            {/* Projects List */}
            {showProjects &&
          projects?.map((project) => (
            <SideBarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
            
            {/* Priority Links */}
            <button onClick={()=>setShowPriority((prev)=>!prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                <span className=''>Priority </span>
                {showPriority?<ChevronUp className='h-5 w-5 '/>:<ChevronDown className='h-5 w-5 '/>}
            </button>
            {showPriority && (
                <>
                <SideBarLink icon={AlertCircle}
                label="Urgent"
                href="/priority/urgent"
                />
                <SideBarLink icon={ShieldAlert}
                label="High"
                href="/priority/high"
                />
                <SideBarLink icon={AlertTriangle}
                label="Medium"
                href="/priority/medium"
                />
                <SideBarLink icon={AlertOctagon}
                label="Low"
                href="/priority/low"
                />
                <SideBarLink icon={Layers3}
                label="Backlog"
                href="/priority/backlog"
                />
                </>
            )}
        </div>
        </div>
        </div>
  );
};


export default SideBar