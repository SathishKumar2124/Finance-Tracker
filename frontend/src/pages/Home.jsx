import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../AxiosInstance';
import {RiDeleteBin6Fill} from "react-icons/ri"
import {FiEdit} from "react-icons/fi"


const Home = () => {
  const [user,setUser] = useState('');
  const [userId,setUserId] = useState("");
  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [payMethod,setPayMethod] = useState("");
  const [records,setRecords] = useState([]);

  

  const navigate = useNavigate();

  useEffect(()=>{
    setUser(localStorage.getItem('email'));
    setUserId(localStorage.getItem('userid'));
  },[]);


  

  const getRecord = async() => {
    try {
      const res = await api.get(`/records/all-record/${userId}`);
      // const sortedRecord = res.data;
      // sortedRecord.sort((a,b) => new Date(b.date) - new Date(a.date) );
      setRecords(res.data);
    } catch (error) {
      console.error("axios error : ",error.response.data || error.message);
    }   
  }



  useEffect(() => {
    if(userId){
      getRecord();
    }
  },[userId])
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem("userid")
    toast.success('user Logout succesfull.');
    setTimeout(() => {  
        navigate('/login')
    },1000);
  }



  const addNewRecord = async(newRecord) => {

    try {
      const url = "/records/new-record"
      const res = await api.post(url,newRecord);
        if(res.data.success){
          setRecords(prev => [newRecord,...prev]);
          toast.success(res.data.msg);
          getRecord()
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

    setDescription("");
    setAmount("");
    setCategory("");
    setPayMethod("");

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

    addNewRecord(newRecord);
    
  }


  const handleDelete = async(id) => {
    try {
      const url = `/records/delete-record/${id}`
      const res = await api.delete(url);
      console.log(res.data)
      if(res.data.success){
        setRecords(prev => prev.filter((r) => r._id !== id ))
        toast.success(res.data.msg);
      }else{
        toast.error(res.data.msg)
      }
    } catch (error) {
      toast.error(res.data.msg || error.response?.data?.message || "Unable to elete!!!")
    }
  }

  return (
    <div className="h-full w-full flex flex-col space-y-5  p-2 ">
        <div className=' h-20 w-full py-9 flex items-center justify-between'>
        <div className='flex flex-col space-y-3'>
          <p className='font-semibold'>your email : {user}</p>
          <p className='font-semibold'>user id : {userId}</p>
        </div>
          <button onClick={handleLogout} className='bg-red-500 h-12 w-24 rounded-3xl text-white uppercase tracking-wider font-bold cursor-pointer'>Logout</button>
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
                  <input type="number" className='border border-black focus:outline-none focus:border-blue-400 p-2' placeholder='enter the amount' onChange={(e) => setAmount(e.target.value)} value={amount} required/>
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
                  <input type="submit" value="Add Record" className='bg-blue-400 w-full h-9 rounded-md uppercase tracking-wider font-semibold text-slate-800 cursor-pointer hover:bg-blue-600' />
                </div>
            </form>
        </div>
        <div className='p-7 w-full'>
          <div className='text-xl font-semibold capitalize text-center'>recent records</div>
          {
          records.length ==  0 ?  <div> no record found !!! </div> :  
            <div>
              {
                records.map((r) => ( 
                  <div key={r._id} className='w-full flex  justify-around items-center space-x-3 mt-3 mb-3 bg-gray-400 p-4' > 
                      <div type="text"  className='border border-black p-2 w-40 flex justify-center items-center ' >{r.description} </div>
                     <div type="text"  className='border border-black p-2 w-40 flex justify-center items-center ' >{r.amount} </div>
                      <div type="text"  className='border border-black p-2 w-40 flex justify-center items-center ' >{r.category} </div>
                     <div type="text"  className='border border-black p-2 w-40 flex justify-center items-center ' >{r.payMethod} </div>
                    <div type="text"  className='border border-black p-2 w-40 flex justify-center items-center ' >{new Date(r.date).toISOString().split('T')[0]} </div>
                    <button className=' text-black text-2xl border border-black h-10 w-10 flex justify-center items-center rounded-full  hover:text-yellow-600 cursor-pointer  '><Link to={`/edit-record/${r._id}`} ><FiEdit /></Link></button>
                      <button className=' text-red-500 text-2xl border border-black h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-500 hover:text-red-600 cursor-pointer  ' onClick={() => handleDelete(r._id)} ><RiDeleteBin6Fill /></button>
                  </div>
                ) )
              }
            </div>
          }

        </div>
        <ToastContainer autoClose={1000} />
    </div>
  )
}

export default Home