import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

const Login = () => {

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

    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        const url = "http://localhost:3001/auth/login"
        const res = await axios.post(url,loginInfo);
        if(res.data.success){
          toast.success(res.data.msg);
          localStorage.setItem("token",res.data.jwtToken);
          localStorage.setItem("email",res.data.email);
          localStorage.setItem("userid",res.data.id);
          setTimeout(()=> {
            navigate('/');
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
        

        <form onSubmit={handleLogin} className='flex flex-col space-y-10  p-4 rounded-lg bg-slate-100 shadow-2xl shadow-gray-500'>
          <h1 className='text-2xl text-center font-extrabold mb-9'>Login</h1>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >Email</label>
            <input type='text' required className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your email' name='email' onChange={handleChange} />
        </div>
        <div className='flex justify-between items-center space-x-4'>
          <label className='text-md font-extrabold uppercase' >password</label>
            <input type='password' required className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter your password' name='password' onChange={handleChange} />
        </div>

          <input type="submit" value="login" className='bg-blue-400 h-9 text-xl uppercase font-semibold tracking-wider rounded-2xl hover:bg-blue-500 cursor-pointer' />
        
        <div className='flex items-center justify-center'> 
            <p className=''>don't have an account ? <Link className='text-blue-700 underline ' to='/signup'>signup</Link> </p>
          </div>

        </form>
        <ToastContainer autoClose={1500} />
    </div>
  )
}

export default Login