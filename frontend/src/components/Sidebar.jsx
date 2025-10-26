import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { MdAddCard } from "react-icons/md";
import { FaSquareMinus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {

  const handleLogout=(e)=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const menus = [
    {
      path: '/',
      name: 'Dashboard',
      id: 1,
      icon: <RxDashboard />
    },
    {
      path: '/addincome',
      name: 'Income',
      id: 2,
      icon: <MdAddCard />
    },
    {
      path: '/addexpense',
      name: 'Expense',
      id: 3,
      icon: <FaSquareMinus />
    },


  ]

  return (
    <div className='min-h-screen bg-white p-2 items-center pt-5 gap-2 hidden md:block'>
      {
        menus.map((menu, index) => (
          <div key={index} className=''>
            <NavLink className={({ isActive }) =>
              isActive ? 'text-neutral-900 font-semibold' :
                'text-gray-700'}
              to={menu.path}>
              <div className='flex items-center gap-2 mt-3'><span className='text-lg font-semibold'>{menu.icon}</span>{menu.name}</div>
            </NavLink>
          </div>
        ))
      }
      <div className='flex items-center gap-2 mt-3 text-md text-gray-700'>
        <span>
          <CgProfile fontSize={18} />
        </span>
        <span>
          <Link to='/login' onClick={()=>handleLogout()}>Logout</Link>
        </span>
      </div>
    </div>
  )
}

export default Sidebar