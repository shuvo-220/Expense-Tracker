import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import AddIncome from './components/AddIncome'
import AddExpense from './components/AddExpense'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='addincome' element={<AddIncome />} />
            <Route path='addexpense' element={<AddExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App