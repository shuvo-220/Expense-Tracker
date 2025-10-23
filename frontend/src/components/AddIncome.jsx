import React from 'react'

const AddIncome = () => {
  return (
    <div className='flex items-center justify-between gap-3'>

      <div className='bg-white w-1/2 h-screen rounded p-3 flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-gray-700 mb-5'>Add Income Details</h1>

        <form>

          <div className='mt-3'>
            <input type='text' placeholder='Income Title'
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Number' placeholder='Income Amount'
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='text' placeholder='Income Category'
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Date' placeholder='Income Date'
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <button className='bg-green-500 py-1 w-[350px] cursor-pointer rounded text-white hover:bg-green-700 duration-300'>Add Income</button>
          </div>
        </form>

      </div>

      <div className='bg-white w-1/2 h-screen rounded p-3'>item list</div>

    </div>
  )
}

export default AddIncome