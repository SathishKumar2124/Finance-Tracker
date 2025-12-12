import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../AxiosInstance';

const Home = () => {
  const [user,setUser] = useState('');
  const [userId,setUserId] = useState("");
  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [payMethod,setPayMethod] = useState("");

  
  const navigate = useNavigate();
  useEffect(()=>{
    setUser(localStorage.getItem('email'));
    setUserId(localStorage.getItem('userid'));
  },[]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    toast.success('user Logout succesfull.');
    setTimeout(() => {
        navigate('/login')
    },2000);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      userId : userId,
      date : new Date(),
      description,
      amount,
      category,
      payMethod
    }

    //backend method call

    // setDescription("");
    // setAmount("");
    // setCategory("");
    // setPayMethod("");

    console.log(newRecord)

  }

  return (
    <div className="h-full w-full flex flex-col space-y-5  p-2 ">
        <div className=' h-20 w-full py-9 flex items-center justify-between'>
        <div className='flex flex-col space-y-3'>
          <p className='font-semibold'>your email : {user}</p>
          <p className='font-semibold'>user id : {userId}</p>
        </div>
          <button onClick={handleLogout} className='bg-red-500 h-12 w-24 rounded-3xl text-white uppercase tracking-wider font-bold'>Logout</button>
        </div>
        <div className='flex flex-col justify-center items-center space-y-4 '>
          <p className='text-xl font-semibold underline'>Add a Record</p>
            <form onSubmit={handleSubmit} className='border flex flex-col p-4 space-y-2'>
                <div className='flex justify-center items-center space-x-4'>
                  <label  className='font-semibold uppercase tracking-wider'>description</label>
                  <input type="text" className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter the description' onChange={(e) => setDescription(e.target.value)} value={description}  required/>
                </div>
                <div className='flex justify-between items-center space-x-4'>
                  <label  className='font-semibold uppercase tracking-wider'>Amount</label>
                  <input type="number" className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter the description' onChange={(e) => setAmount(e.target.value)} value={amount} required/>
                </div>
                <div className='flex justify-between items-center space-x-4'>
                  <label  className='font-semibold uppercase tracking-wider'>category</label>
                  <select required className='border w-56 h-8  focus:outline-none ' onChange={(e) => setCategory(e.target.value)} value={category}>
                      <option value="">Select a Category</option>
                      <option value="Food">Food</option>
                      <option value="Rent">Rent</option>
                      <option value="Salary">Salary</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
                <div className='flex justify-between items-center space-x-4'>
                  <label  className='font-semibold uppercase tracking-wider'>Pay method</label>
                  <select required className='border w-56 h-8  focus:outline-none ' onChange={(e) => setPayMethod(e.target.value)} value={payMethod}>
                      <option value="">Select a method</option>
                      <option value="Food">Cash</option>
                      <option value="Rent">Card</option>
                      <option value="Salary">Upi</option>
                  </select>
                </div>
                <div className='flex justify-center items-center my-3 p-2'>
                  <input type="submit" value="Add Record" className='bg-blue-400 w-full h-9 rounded-md uppercase tracking-wider font-semibold text-slate-800 cursor-pointer hover:bg-blue-600' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Home