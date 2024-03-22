"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar.store'
import { ArrowLeftFromLineIcon, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';

export const Toggle = () => {
    const {
        collapsed,
        onCollapse,
        onExpand
    } = useSidebar((state) => state);


    const label = collapsed ? "Expand" : "Collapse"
    return (
        <>
            {collapsed && (
                <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                    <Hint label={label} side='right' asChild>
                        <Button className='h-auto p-2' variant={"outline"}
                            onClick={onExpand}>
                            <ArrowRightFromLine className='w-3 h-3' />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className='p-3 pl-2 mb-2 flex items-center w-full'>
                    <p className='font-semibold text-primary mr-2'>Dashboard</p>
                    <Hint label={label} side='right' asChild>
                        <Button className='h-auto p-2 ml-auto cursor-pointer' variant={"outline"}
                            onClick={onCollapse}>
                            <ArrowLeftFromLineIcon className='w-3 h-3' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}
