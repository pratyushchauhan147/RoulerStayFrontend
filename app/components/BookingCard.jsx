import React from 'react'
import Image from 'next/image';
import {motion,useScroll } from "framer-motion";
import Link from 'next/link';
import { useEffect,useState } from "react"


const BookingCard = (props) => {
  const [data, setData] = useState(null)
  const [title, setTitle] = useState(null)

  useEffect(() => {
   const token = localStorage.getItem("token");
    fetch('https://pratyushchauhan147.pythonanywhere.com/api/properties/'+props.property , {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, [])
  if(data){
  return (
    <div className=' m-4 p-1 flex-wrap   rounded-md min-h-40 flex sm:flex-col lg:md:flex-row border-2 border-blue-400'>
        <div className=" rounded-md flex  justify-center item-center ">
            <Link className='h-full w-44' href={'/properties/'+data.id}><Image className='rounded-md min-h-40' src={data.photos[0].url} width={180} style={{height:"180px"}} height={180}></Image></Link>
            
              </div>
        <div className=" min-h-24 m-2 p-1 flex  flex-col ">
            
            <h1 className=' text-3xl'>{data.title}</h1>
            <h2 className='text-2xl text-gray-500 '><span className='font-semibold text-gray-700'></span>{data.host.username}</h2>
            <h2 className='text-2xl   text-gray-500'><span className='font-semibold  text-gray-700'></span>{data.property_type.name}</h2>
            <h2 className='text-1xl   text-blue-500'><span className='font-semibold  text-blue-500'></span><Link href={data.location_address}>see on Map</Link></h2>
        
        </div>
        <div className=" m-2  flex justify-center items-center bg-gray-200 h-10 p-3 rounded-md "><h1 className='text-2xl text-blue-500'>Rs.{data.price}</h1></div>
      <div className='h-full flex flex-col lg:flex-col md:sm:flex-row justify-around p-3 '>
        <h1 className=' p-3 rounded-sm m-1 bg-gray-200'>check in  : <span className=' text-green-500'>{props.data.check_in_date}</span> </h1>
        <h1 className=' m-1 rounded-sm p-3 bg-gray-200'>check out : <span className=' text-pink-500'>{props.data.check_out_date}</span> </h1>
         
         </div>
    </div>
  )
}
else{
    return ( <div>Nothing</div> )
}
}
export default BookingCard
