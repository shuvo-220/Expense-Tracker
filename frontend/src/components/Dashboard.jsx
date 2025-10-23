import React from 'react'
import { AiFillDollarCircle } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-full gap-3'>

      <div className='w-1/2 bg-white p-3 h-screen'>
       <h1 className='py-5 text-lg font-semibold text-gray-700'>Dashboard Analytics</h1>
        <div className='flex flex-col items-center justify-center md:flex-row gap-5'>

          <div className='p-3 shadow-md rounded-sm bg-purple-100'>
            <h3 className='text-purple-600 text-sm md:text-lg font-semibold'>Total Balance</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-purple-700'>
                <AiFillDollarCircle />
              </span>
              <span className='text-purple-700 font-bold'>$564</span>
            </div>
          </div>

          <div className='p-3 shadow-md rounded-sm bg-green-100'>
            <h3 className='text-green-600 text-sm md:text-lg font-semibold'>Total Income</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-green-700'>
                <AiFillDollarCircle />
              </span>
              <span className='text-green-700 font-bold'>$564</span>
            </div>
          </div>

            <div className='p-3 shadow-md rounded-sm bg-red-100'>
            <h3 className='text-red-600 text-sm md:text-lg font-semibold'>Total Expense</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-red-700'>
                <AiFillDollarCircle />
              </span>
              <span className='text-red-700 font-bold'>$564</span>
            </div>
          </div>

        </div>

         <h2 className='py-5'>Bar Chart</h2>

      </div>

      <div className='w-1/2 bg-white h-screen p-3'>
        <h1 className='text-xl font-semibold text-gray-700 py-5'>Recent Transition</h1>
      </div>

    </div>
  )
}

export default Dashboard