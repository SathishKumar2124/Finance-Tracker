import React from 'react'

const SignUp = () => {
  return (
    <div className='mt-20 flex flex-col justify-center items-center'>
        
        <h1 className='text-2xl text-center font-extrabold mb-4'>Signup</h1>

        <form className='flex flex-col space-y-6 border p-4 rounded-lg bg-slate-100'>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >Email</label>
            <input type='text' required className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your email'  />
        </div>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >password</label>
            <input type='password' required className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your password'  />
        </div>

          <input type="submit" value="signup" className='bg-blue-400 h-9 text-xl uppercase font-semibold tracking-wider rounded-2xl hover:bg-blue-500 cursor-pointer' />

          <div className='flex items-center justify-center'> 
            <p className=''>already have an account ? <a className='text-blue-700 underline ' href='/login'>login</a> </p>
          </div>
        
        </form>

    </div>
  )
}

export default SignUp