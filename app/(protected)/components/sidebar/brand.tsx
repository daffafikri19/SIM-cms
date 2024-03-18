import Image from 'next/image'
import React from 'react'

export const Brand = () => {
  return (
    <div className='flex flex-1 items-center space-x-2 cursor-pointer p-4 border-b'>
        <Image src={"/brand-logo.svg"} alt='logo' width={150} height={150} priority />
    </div>
  )
}
