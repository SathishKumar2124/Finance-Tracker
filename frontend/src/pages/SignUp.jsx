import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const SignUp = () => {

    const [loginInfo,setLoginInfo] = useState({
      email : "",
      password : ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
      const {name,value} = e.target;
      const newLoginInfo = {...loginInfo};
      newLoginInfo[name] = value;
      setLoginInfo(newLoginInfo);
    }

    const handleSignup = async(e) => {
      e.preventDefault();
      try {
        const url = "http://localhost:3001/auth/signup"
        const res = await axios.post(url,loginInfo);
        if(res.data.success){
          toast.success(res.data.msg);
          setTimeout(() => {
              navigate('/login');
          },2000)
          
          
        }else{
          toast.error(res.data.msg || "something went wrong!!")
        }
      } catch (error) {
        if(error.response){
          console.log("server error",error.response.data);
          toast.error(error.response.data.msg || "server error!!!")
        }else if(error.request){
          console.log("network error " , error.request);
          toast.error("network error");
        }else{
          console.log("error :" , error.message);
          toast.error("unexpected error");
        }
      }
    }

  return (
    <div className='mt-20 flex flex-col justify-center items-center'>
        <form onSubmit={handleSignup} className='flex flex-col space-y-10  p-4 rounded-lg bg-slate-100 shadow-2xl shadow-gray-500'>
          <h1 className='text-2xl text-center font-extrabold mb-9'>Signup</h1>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >Email</label>
            <input type='email' required name='email' className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your email' onChange={handleChange} value={loginInfo.email} />
        </div>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >password</label>
            <input type='password' required name='password' className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your password' onChange={handleChange} value={loginInfo.password}  />
        </div>

          <input type="submit" value="signup" className='bg-blue-400 h-9 text-xl uppercase font-semibold tracking-wider rounded-2xl hover:bg-blue-500 cursor-pointer'  />

          <div className='flex items-center justify-center'> 
            <p className=''>already have an account ? <Link className='text-blue-700 underline ' to='/login'>login</Link> </p>
          </div>
        
        </form>
          <ToastContainer autoClose={1000}/>
    </div>
  )
}

export default SignUp