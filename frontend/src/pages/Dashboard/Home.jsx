import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import infoCard from '../../components/cards/infoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io'
import { addThousandSeperator } from '../../utils/helper';

const Home = () => {

  useUserAuth();

  const navigate = useNavigate();

  const[dashboardData, setDashboardData] = useState(null);
  const[loading, setLoading] = useState(false);

  const fetchDashboardData=async()=>{
    if(loading){
      setLoading(true)
    }
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      if(response.data){
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log('something went wrong', error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboardData()
    return ()=>{

    }
  })

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <infoCard 
            icon={<IoMdCard />}
            label='Total Balance'
            value={addThousandSeperator(dashboardData?.totalBalance || 0)}
            color='bg-primary'
          />

          <infoCard 
            icon={<LuWalletMinimal />}
            label='Total Income'
            value={addThousandSeperator(dashboardData?.totalIncome || 0)}
            color='bg-orange-500'
          />

          <infoCard 
            icon={<LuHandCoins />}
            label='Total Expense'
            value={addThousandSeperator(dashboardData?.totalExpense || 0)}
            color='bg-red-500'
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home