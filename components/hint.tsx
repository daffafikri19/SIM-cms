import React, { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface props {
    label: string
    children: ReactNode
    asChild: boolean
    side?: "top" | "bottom" | "left" | "right"
    align?: "center" | "start" | "end"
}

export const Hint = ({
  label,
  children,
  asChild,
  side,
  align  
 } : props) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild={asChild} className='z-50 bg-background'>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align} className='z-50 bg-background'>
                <p className='font-semibold z-50'>
                    {label}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
