import React, { useEffect } from 'react'
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { myAllExpense } from '../../redux/slice/myExpense';
import { getMyIncome } from '../../redux/slice/myIncome';
import { recentTransitions } from '../../redux/slice/recentTransition';
import { BiSolidCategory } from 'react-icons/bi';
import { MdAnalytics } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { Chart as Chartjs } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const Dashboard = () => {

  const { myIncome } = useSelector(state => state.myIncome)
  const { myExpense } = useSelector(state => state.myExpense);

  const totalIncome = myIncome.reduce((a, c) => a + c.amount, 0)
  const totalExpense = myExpense.reduce((a, c) => a + c.amount, 0)

  const totalBanlance = totalIncome - totalExpense;

  const dispatch = useDispatch()

  const { isLoading, recent, error } = useSelector(state => state.recent);


  useEffect(() => {
    dispatch(myAllExpense())
    dispatch(getMyIncome())
    dispatch(recentTransitions())
  }, [dispatch])

  const incomeByDate = myIncome.reduce((acc, cur) => {
  const date = new Date(cur.date).toLocaleDateString();
  acc[date] = (acc[date] || 0) + cur.amount;
  return acc;
}, {});

  const expenseByDate = myExpense.reduce((acc, cur) => {
  const date = new Date(cur.date).toLocaleDateString();
  acc[date] = (acc[date] || 0) + cur.amount;
  return acc;
}, {});

const allDates = Array.from(new Set([
  ...Object.keys(incomeByDate),
  ...Object.keys(expenseByDate)
])).sort((a, b) => new Date(a) - new Date(b));

const barData = {
  labels: allDates,
  datasets: [
    {
      label: 'Income',
      data: allDates.map(date => incomeByDate[date] || 0),
      backgroundColor: 'rgba(34,197,94,0.6)'
    },
    {
      label: 'Expense',
      data: allDates.map(date => expenseByDate[date] || 0),
      backgroundColor: 'rgba(239,68,68,0.6)'
    }
  ]
};
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-full gap-3'>

      <div className='w-1/2 bg-white p-3 min-h-screen shadow-md rounded-md'>
        <h1 className='py-5 text-lg font-semibold text-gray-700 flex items-center gap-2'><MdAnalytics fontSize={25} />Dashboard Analytics</h1>
        <div className='flex flex-col items-center justify-center md:flex-row gap-5'>

          <div className='p-3 shadow-md rounded-sm bg-purple-100'>
            <h3 className='text-purple-600 text-sm md:text-lg font-semibold'>Total Balance</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-purple-700'>
                <AiFillDollarCircle />
              </span>
              <span className={`font-bold ${totalBanlance < 0 ? 'text-red-500' : 'text-purple-500'}`}>${totalBanlance}</span>
            </div>
          </div>

          <div className='p-3 shadow-md rounded-sm bg-green-100'>
            <h3 className='text-green-600 text-sm md:text-lg font-semibold'>Total Income</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-green-700'>
                <AiFillDollarCircle />
              </span>
              <span className='text-green-700 font-bold'>${totalIncome}</span>
            </div>
          </div>

          <div className='p-3 shadow-md rounded-sm bg-red-100'>
            <h3 className='text-red-600 text-sm md:text-lg font-semibold'>Total Expense</h3>
            <div className='flex items-center justify-between'>
              <span className='text-xl text-red-700'>
                <AiFillDollarCircle />
              </span>
              <span className='text-red-700 font-bold'>${totalExpense}</span>
            </div>
          </div>

        </div>

        <h2 className='py-5 text-xl text-gray-700'>Bar Chart</h2>

        <div>
          <Bar 
            data={barData}
          />
        </div>

      </div>

      <div className='w-1/2 bg-white min-h-screen p-3 shadow-md rounded-md'>
        <h1 className='text-xl font-semibold text-gray-700 py-5 flex items-center gap-2'>
          <IoAnalyticsSharp fontSize={25} />Recent Transition</h1>

        <div>
          {isLoading && <p>Loading...</p>}
          {recent.map((recent, index) => (
            <div key={index} className='m-2'>
              <div className={`${recent.type === 'income' ? 'bg-green-50' : 'bg-red-50'} py-2 px-3 rounded-sm`}>

                <div className='flex items-center justify-between'>
                  <h3 className={`text-lg font-semibold ${recent.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>{recent.title}</h3>
                  <span className={`flex items-center justify-center gap-2 ${recent.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    <span><BiSolidCategory /></span>
                    {recent.category}</span>
                </div>

                <div className='flex items-center justify-between text-md'>
                  <div className='flex items-center justify-between gap-3'>
                    <span className={`flex items-center gap-2 text-md ${recent.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
                      <AiOutlineDollar fontSize={18} className='' />
                      <p className='text-sm font-bold'>${recent.amount}</p>
                    </span>

                    <span className={`text-xs ${recent.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {new Date(recent.date).toLocaleDateString()}
                    </span>
                    <div className={`text-xs ${recent.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>type : {recent.type}</div>
                  </div>
                </div>

                  


              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Dashboard