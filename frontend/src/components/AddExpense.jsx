import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myAllExpense } from '../../redux/slice/myExpense';
import { BiSolidCategory } from 'react-icons/bi';
import { AiOutlineDollar } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { addexpense } from '../../redux/slice/addExpense';
import { deleteExpense } from '../../redux/slice/deleteExpense';

const AddExpense = () => {

  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();

  const{isLoading, myExpense,error} = useSelector(state=>state.myExpense);
  console.log(myExpense)

  const dispatch = useDispatch()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const data = {title, amount, category, date}
      await dispatch(addexpense(data))
      dispatch(myAllExpense())
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete=(id)=>{
    dispatch(deleteExpense(id))
    dispatch(myAllExpense())
  }

  useEffect(()=>{
    dispatch(myAllExpense())
  },[dispatch]);

  return (
    <div className='flex items-center justify-between gap-3'>

      <div className='bg-white w-1/2 h-screen rounded p-3 flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-gray-700 mb-5'>Add Expense Details</h1>

        <form onSubmit={handleSubmit}>

          <div className='mt-3'>
            <input type='text' placeholder='Expense Title'
              onChange={(e) => setTitle(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Number' placeholder='Expense Amount'
              onChange={(e) => setAmount(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='text' placeholder='Expense Category'
              onChange={(e) => setCategory(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <input type='Date' placeholder='Expense Date'
              onChange={(e) => setDate(e.target.value)}
              className='border border-gray-300 py-1 px-2 rounded focus:outline-gray-500 w-[350px]' />
          </div>

          <div className='mt-3'>
            <button className='bg-red-500 py-1 w-[350px] cursor-pointer rounded text-white hover:bg-red-700 duration-300'>
              Add Expense</button>
          </div>
        </form>

      </div>

       <div className='bg-white w-1/2 h-screen rounded p-3'>
              <h1 className='text-lg font-semibold text-gray-700'>All Expense List</h1>
              <div>
                {myExpense.length >0 ? <>
                  {
                    
                    myExpense.map((expense, index) => (
                      <div key={index} className='p-2'>
                        <div className='bg-red-50 py-2 px-3 rounded-sm'>
      
                          <div className='flex items-center justify-between'>
                            <h3 className='text-lg font-semibold text-red-600'>{expense.title}</h3>
                            <span className='flex items-center justify-center gap-2 text-red-500'>
                              <span><BiSolidCategory /></span>
                              {expense.category}</span>
                          </div>
      
                          <div className='flex items-center justify-between text-md'>
                            <div className='flex items-center gap-3'>
                              <span className='flex items-center gap-2 text-md text-red-700'>
                                <AiOutlineDollar fontSize={18} className='' />
                                <p className='text-sm font-bold'>${expense.amount}</p>
                              </span>
      
                              <span className='text-xs text-red-600'>
                                {new Date(expense.date).toLocaleDateString()}
                              </span>
                            </div>
      
                            <div className='flex items-center gap-2'>
                              <span className='text-green-700 cursor-pointer'><FaEdit /></span>
                              <span onClick={()=>handleDelete(expense._id)} className='text-red-600 cursor-pointer'><MdDelete /></span>
                            </div>
                          </div>
      
      
      
                        </div>
                      </div>
                    ))
                  }
                </> : <p>No Expense Found.</p>}
              </div>
            </div>

    </div>
  )
}

export default AddExpense