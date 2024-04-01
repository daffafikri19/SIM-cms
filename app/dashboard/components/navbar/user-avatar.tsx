import { Avatar } from 'antd';
import React from 'react'

export const UserAvatar = () => {

   const isBoy = true;

  return (
    <Avatar size={"large"} className='cursor-pointer' shape='circle' src={isBoy ? "/avatar-boy.png" : "/avatar-girl.png"} />
  )
}
