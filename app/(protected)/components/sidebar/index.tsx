import React from 'react'
import { Wrapper } from './wrapper'
import { Toggle } from './toggle'
import { SidebarMenu } from './sidebar-menu'

export const Sidebar = () => {
    return (
        <Wrapper>
            <Toggle />
            <SidebarMenu />
        </Wrapper>
    )
}
