import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../AxiosInstance';
import {toast} from 'react-toastify'

const EditRecord = () => {

  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [payMethod,setPayMethod] = useState("");


  const {id} =  useParams();
  useState(async() => {
    const url = `records/record/${id}`
    const res = await api.get(url);
    setDescription(res.data.description);
    setAmount(res.data.amount);
    setCategory(res.data.category);
    setPayMethod(res.data.payMethod);
  },[] );


  const navigate = useNavigate()
 


  const handleUpdate = async(e) => {
    e.preventDefault();
    const newData = {
      description,
      amount,
      category,
      payMethod
    }
    try {
      const url = `records/update-record/${id}`
      const res = await api.put(url,newData);
      if(res.data.success){
        toast.success(res.data.msg || "Record Updated!!!")
          navigate('/')
      }else{
        toast.error(res.data.msg || "unable to update!!!")
      }
    } catch (error) {
      toast.error(res.data.msg || error.response?.data?.message || "Unable to Update!!!");
    }
  } 

  return (
    <div>
      <div className='flex flex-col justify-center items-center space-y-4 '>
          <p className='text-xl font-semibold underline'>Update Record</p>
            <form onSubmit={handleUpdate} className='border flex flex-col p-4 space-y-2'>
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
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Upi">Upi</option>
                  </select>
                </div>
                <div className='flex justify-center items-center my-3 p-2'>
                  <input type="submit" value="Update Record" className='bg-blue-400 w-full h-9 rounded-md uppercase tracking-wider font-semibold text-slate-800 cursor-pointer hover:bg-blue-600' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditRecord