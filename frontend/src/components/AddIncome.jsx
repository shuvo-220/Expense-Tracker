import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIncome } from '../../redux/slice/addIncome';
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlineDollar } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { incomeDelete } from '../../redux/slice/deleteIncome';
import {getMyIncome} from '../../redux/slice/myIncome';

const AddIncome = () => {

  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();

  const { isLoading, myIncome, error } = useSelector(state => state.myIncome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyIncome())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, amount: Number(amount), category, date }
      const res = await dispatch(addIncome(data));
      dispatch(getMyIncome())
    } catch (error) {
      console.log(error.message)
    }
  }

  const hnadleDelete=async(id)=>{
    await dispatch(incomeDelete(id))
    await dispatch(getAllIncome())
  }

  return (
    <div className='flex items-center justify-between gap-3'>

      <div className='bg-white w-1/2 h-screen rounded p-3 flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-gray-700 mb-5'>Add Income Details</h1>

        <form onSubmit={handleSubmit}>

          <div className='mt-3'>
            <input type='text' placeholder='Income Title'
              onChange={(e) => setTitle(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Number' placeholder='Income Amount'
              onChange={(e) => setAmount(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='text' placeholder='Income Category'
              onChange={(e) => setCategory(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Date' placeholder='Income Date'
              onChange={(e) => setDate(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <button className='bg-green-500 py-1 w-[350px] cursor-pointer rounded text-white hover:bg-green-700 duration-300'>Add Income</button>
          </div>
        </form>

      </div>

      <div className='bg-white w-1/2 h-screen rounded p-3'>
        <h1 className='text-lg font-semibold text-gray-700'>All Income List</h1>
        <div>
          {myIncome.length >0 ? <>
            {
              
              myIncome.map((income, index) => (
                <div key={index} className='p-2'>
                  <div className='bg-green-100 py-2 px-3 rounded-sm'>

                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold text-green-600'>{income.title}</h3>
                      <span className='flex items-center justify-center gap-2 text-green-500'>
                        <span><BiSolidCategory /></span>
                        {income.category}</span>
                    </div>

                    <div className='flex items-center justify-between text-md'>
                      <div className='flex items-center gap-3'>
                        <span className='flex items-center gap-2 text-md text-green-700'>
                          <AiOutlineDollar fontSize={18} className='' />
                          <p className='text-sm font-bold'>${income.amount}</p>
                        </span>

                        <span className='text-xs text-green-600'>
                          {new Date(income.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <span className='text-green-700 cursor-pointer'><FaEdit /></span>
                        <span onClick={()=>hnadleDelete(income._id)} className='text-red-600 cursor-pointer'><MdDelete /></span>
                      </div>
                    </div>



                  </div>
                </div>
              ))
            }
          </> : <p>No Incomes Found.</p>}
        </div>
      </div>

    </div>
  )
}

export default AddIncome