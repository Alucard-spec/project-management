"use client";
import React, { useState } from 'react'
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from '../BoardView';
import List from '../ListView';
import Timeline from '../TimelineView';
import Table from '../TableView';
import ModalNewTask from '@/components/ModalNewTask';
import { useParams } from 'next/navigation';

// This page grabs the [id] it is automatically doing it by default because of next js

const Project = () => {
    const { id } = useParams() as { id: string };
    const [activeTab,setActiveTab]= useState("Board");
    const [isModalNewTaskOpen,setIsModalNewTaskOpen]= useState(false); 
  return (
    <div>
        {/* Modal New Task */}
        <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={()=>setIsModalNewTaskOpen(false)}
        id={id}/>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        {activeTab ==="Board" && (
            <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab ==="List" && (
            <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab ==="Timeline" && (
            <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab ==="Table" && (
            <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
    </div>
  )
}

export default Project