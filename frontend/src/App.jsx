import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import AddIncome from './components/AddIncome'
import AddExpense from './components/AddExpense'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Error from './components/Error'
import PublicRoute from './components/PublicRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>} >
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='addincome' element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
            <Route path='addexpense' element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path='/*' element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App