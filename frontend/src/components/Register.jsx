import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { base_url } from '../baseUrl';

const Register = () => {

  const[name, setName] = useState();
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();

  const navigate = useNavigate();

const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const res = await axios.post(`${base_url}/api/user/register`,{
      name, email, password
    })
    console.log(res.data)
    navigate('/login')
  } catch (error) {
    console.log(error.messsage)
  }
}

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl text-gray-500 py-3'>Registration Form</h1>
      <div className='border border-gray-200 rounded-sm shadow-md py-7 px-8'>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <input type='text' placeholder='Your Name'
            onChange={(e)=>setName(e.target.value)}
              className='border border-gray-400 w-[250px] py-1 px-3 focus:outline-gray-500 rounded-sm'
            />
          </div>

          <div className='mt-3'>
            <input type='email' placeholder='Your Email'
            onChange={(e)=>setEmail(e.target.value)}
              className='border border-gray-400 w-[250px] py-1 px-3 focus:outline-gray-500 rounded-sm'
            />
          </div>

          <div className='mt-3'>
            <input type='password' placeholder='Your Password'
            onChange={(e)=>setPassword(e.target.value)}
              className='border border-gray-400 w-[250px] py-1 px-3 focus:outline-gray-500 rounded-sm'
            />
          </div>

          <div className='mt-3'>
            <button className='bg-blue-500 py-1 w-[250px] text-white rounded-sm cursor-pointer hover:bg-blue-600 duration-300'>Registration</button>
          </div>
        </form>
        <p className='text-gray-500 text-sm pt-1'>Already have an account?
          <Link to='/login' className='text-blue-500 underline text-sm'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register