"use client"

import React from 'react'
import { useSidebar } from '@/store/use-sidebar.store'
import { BoxIcon, FilesIcon, HomeIcon, SettingsIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

const ListMenu = [
    {
        label: "Beranda",
        icon: HomeIcon,
        href: "/dashboard"
    },
    {
        label: "Menu 2",
        icon: HomeIcon,
        href: "/dashboard/2"
    },
    {
        label: "Menu 3",
        icon: HomeIcon,
        href: "/dashboard/3"
    },
    {
        label: "Menu 4",
        icon: HomeIcon,
        href: "/dashboard/4"
    }
]

export const SidebarMenu = () => {
    const pathname = usePathname();
    const { collapsed } = useSidebar((state) => state);
    const showLabel = !collapsed;

    return (
        <div>
            {showLabel && (
                <div className='pl-3 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Menu
                    </p>
                </div>
            )}
            {collapsed && (
                <ul className='w-full flex items-center justify-center flex-col gap-2'>
                    {ListMenu.map((item) => (
                        <Hint key={item.href} label={item.label} side='right' asChild>
                            <Link href={item.href}>
                                <Button className='h-auto p-2'
                                    variant={pathname === item.href ? "default" : "outline"}>
                                    <item.icon className='w-5 h-5' />
                                </Button>
                            </Link>
                        </Hint>
                    ))}
                </ul>
            )}
            {!collapsed && (
                <ul className='space-y-2 px-2'>
                    {ListMenu.map((item) => (
                        <Link key={item.label} href={item.href} className='flex items-center justify-start'>
                            <Button className="w-full pl-2 gap-3 flex justify-start"
                                variant={pathname === item.href ? "default" : "secondary"}>
                                <item.icon className='w-4 h-4' />
                                <p className='text-xs truncate'>{item.label}</p>
                            </Button>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}
