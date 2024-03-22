"use client"
import React, { ReactNode } from 'react'
import { useSidebar } from '@/store/use-sidebar.store'
import { cn } from '@/lib/utils'

interface props {
    children: ReactNode
}

export const Wrapper = ({ 
    children
} : props) => {

    const { collapsed } = useSidebar((state) => state);
  
  return (
    <aside className={cn("fixed left-0 border border-r flex flex-col w-36 h-full min-h-full bg-background", 
        collapsed && "w-[50px]"
    )}>
        {children}
    </aside>
  )
}
