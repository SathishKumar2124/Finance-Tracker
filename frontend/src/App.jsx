import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './ProtectedRoutes'
import PageNotFound from './pages/PageNotFound'


const App = () => {
  return (
    <div className='h-screen w-full p-4 '>
      <div className='w-full h-16 bg-gray-200 rounded-full mb-9 flex justify-center items-center px-9'>
      <div className='uppercase tracking-widest font-extrabold text-md md:text-3xl'>finance Tracker</div>
      </div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
              <Route path='/' element={ <Home /> } />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  )
}

export default App