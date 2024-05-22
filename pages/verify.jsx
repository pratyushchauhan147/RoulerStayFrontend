import React from 'react'
import { useState,useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import axios from "axios"
import "../app/globals.css"
import Ver from '@/app/components/Ver'
import Error from "../app/components/Error"

const verify = () => {
  const [otp, setotp] = useState(7465);
const [otpv, setotpv] = useState(null);
const [email, setemail] = useState("");
const [tok, settok] = useState("");
const [otpmess, setotpmess] = useState("");
const [otpsend, setotpsend] = useState(false);
const [errorOcc, seterrorOcc] = useState(false)
const [errorData, seterrorData] = useState("no")
const  router = useRouter()
var errorarray = []
var errordata = []
var randomNum 
var formattedRandomNum 
function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const handlemessage = (e) =>{
    e.preventDefault()
    
    

    
    const token = localStorage.getItem("token")
    settok(token)
    axios.post('http://127.0.0.1:8000/api/verify/',{
      message:otp
      },{headers:{Authorization: `Token ${token}`}} )
      .then((response)=> {
        console.log("OtpSend")
        setotpsend(true)
      })
      .catch((error)=> {
        seterrorOcc(true)
        if(error.response)
        {
          errorarray = error.response.data
            console.log(errorarray)
           if(errorarray.reciver && errorarray.reciver[0] == "This field may not be blank.")
            {seterrorData("Enter The Email")}
           if(error.response.status === 500)
           {
            seterrorData("Enter a  Valid Email")

         

          }
    }
      });
}

useEffect(() => {
  randomNum = Math.random() * 9000
  formattedRandomNum = randomNumberInRange(1111,9999)
setotpmess("your verification otp is : "+formattedRandomNum)
setotp(formattedRandomNum)
},handlemessage);

  return (
    <div className='flex flex-col justify-around bg-white items-center h-[100vh] '>
      <div className='flex flex-col justify-center items-center '>
      <h1 className='text-[64px] font-bold text-blue-500 '> Rouler <span className='text-orange' >Stay</span> </h1>
      <h1 className='text-[24px] tracking-widest font-bold text-gray-900 '>Nature is everywhere</h1>
      </div>
            <div className="innerbox  bg-green-100 w-1/2 h-1/2 p-5 flex items-center justify-center flex-col rounded-lg  ">
            <h1 className=' text-gray-600 text-center m-2'>Click on send Code to get a 4 digit verification number on your registerd email</h1>
            <form onSubmit={handlemessage} >
                  <button className='px-4 py-1 drop-shadow-lg bg-green-600 text-white rounded-lg flex justify-center items-center' type="submit">Send code</button>
            </form>
            <Ver className="" otp={otp} send={otpsend} tok={tok}></Ver>

            </div>
             
     
    </div>
  )
}

export default verify
