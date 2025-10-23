import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex bg-neutral-100'>
        <div className='w-[150px] p-3'>
            <Sidebar />
        </div>
        <div className='p-3 flex-1'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout