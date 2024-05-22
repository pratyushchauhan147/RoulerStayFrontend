import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import BookingCard from "@/app/components/BookingCard";
import { useRouter } from "next/router";
import NotVerified from '@/app/components/NotVerified'
import { useEffect, useState } from "react";
import TryLogin from "@/app/components/TryLogin";
import "@/app/globals.css"
import {motion } from "framer-motion";

import Head from "next/head";
const bookings = () => {
  const [data, setData] = useState(null)
  const [status, setstatus] = useState();
  const [isLoading, setLoading] = useState(true)
  const [c, setc] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('https://pratyushchauhan147.pythonanywhere.com/api/bookings/', {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },}
  ).then((response) => {
    setData(response.data)
    console.log(response.data)
    setstatus(response.status)
}).catch((error)=>{
  console.log(error)
  setstatus(error.response.status)

})
  }, [])

  if(status == 401)
    {
      return ( <div > <Navbar></Navbar>
      <TryLogin></TryLogin>
      </div>
      )
    }

  return (
    <>
    <Navbar></Navbar>
    
    <div className=" flex flex-col justify-center items-center p-4">
      <div className="heading"><h1 className=" font-semibold text-4xl">Your Bookings:</h1></div>

      <div className="m-3 book flex flex-col w-full  items-center justify-center item-start">
  {data?data.map((b) => {
    return <BookingCard  className=" m-1" key={b.id} data={b} property={b.property} />;
  }):console.log("kkk")}
</div>

      

      


      
      
    </div>
    </>
  )
}

export default bookings
