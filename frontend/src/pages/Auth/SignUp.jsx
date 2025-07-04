import React, { useState } from 'react'
import AuthLayouts from '../../components/layouts/AuthLayouts'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector'

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError('please enter full name')
      return
    }

    if (!validateEmail(email)) {
      setError('please enter a valid email')
      return
    }

    if(!password){
      setError('please enter the password')
      return
    }
    setError('')

    //signup api call
    
  }

  return (
    <AuthLayouts>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by enterning your details today.</p>

        <form onSubmit={handleSubmit}>

          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label='Full Name'
              placeholder='Name'
              type='text'
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label='Email Address'
              placeholder='email@gmail.com'
              type='text'
            />

            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label='password'
                placeholder=''
                type='password'
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>SignUp</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Have an account?
            <Link to='/login' className='font-medium text-primary underline'>Login</Link>
          </p>
        </form>

      </div>
    </AuthLayouts>
  )
}

export default SignUp