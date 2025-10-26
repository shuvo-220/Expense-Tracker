import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        No Page Found.<Link to='/'>Home</Link>
    </div>
  )
}

export default Error