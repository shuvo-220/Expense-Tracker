import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const menus = [
     {
      path:'/',
      name:'Dashboard',
      id:1
    },
    {
      path:'/addincome',
      name:'Income',
      id:2
    },
    {
      path:'/addexpense',
      name:'Expense',
      id:3
    },
    {
      path:'/profile',
      name:'Profile',
      id:4
    },
    {
      path:'/login',
      name:'Logout',
      id:5
    },
  ]

  return (
    <div className='h-screen bg-white p-2 items-center pt-5 gap-2 hidden md:block'>
      {
        menus.map((menu, index)=>(
          <div key={index}>
            <NavLink className={({isActive})=> isActive ? 'text-neutral-900 font-semibold' : 'text-gray-700'} to={menu.path}>{menu.name}</NavLink>
          </div>
        ))
      }
    </div>
  )
}

export default Sidebar