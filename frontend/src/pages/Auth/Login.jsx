import React, { useContext, useState } from 'react'
import AuthLayouts from '../../components/layouts/AuthLayouts'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
// import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/UserContext'

const Login = () => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState(null)

  const{updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(!email){
      setError('please enter a valid email')
      return
    }
    if(!password){
      setError('please enter the password')
      return
    }
    setError('')
    //login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
      })
       console.log('Full response:', response)
      const {token, user} = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user)
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error)
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError('something went wrong');
      }
    }
  }

  return (
    <AuthLayouts>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({target})=>setEmail(target.value)}
            label='Email Address'
            placeholder='email@gmail.com'
            type='text'
          />

          <Input 
            value={password}
            onChange={({target})=>setPassword(target.value)}
            label='password'
            placeholder=''
            type='password'
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have any account?
            <Link to='/signup' className='font-medium text-primary underline'>Signup</Link>
          </p>
        </form>

      </div>
    </AuthLayouts>
  )
}

export default Login