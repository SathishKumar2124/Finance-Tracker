import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='min-h-screen w-full bg-black flex flex-col justify-center items-center space-y-9'>
        <div className='text-white text-4xl font-semibold '> 404 page not found !!! </div>
        <div className='text-white text-4xl font-semibold underline '><Link to="/"> go to home !!! </Link></div>
    </div>
  )
}

export default PageNotFound