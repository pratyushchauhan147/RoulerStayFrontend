
import { useState,useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import axios from "axios"
import "../globals.css"

import Error from "./Error"

const Ver = (props) => {
  const [otpv, setotpv] = useState(null);
  const [erroroc, seterroroc] = useState(false);
 
  const [otpcondition, setotpcondition] = useState(false);
  const  router = useRouter()

  useEffect(() => {
    if((otpv<1000 || otpv>9999) || !props.send || ( otpv/1000 ==0 ) || otpv==null )
    {
      setotpcondition(false)
    }
    else
    {
      setotpcondition(true)
    }
  }, [otpv]);
 
  const checkotp = ()=>{
    if(props.otp == otpv)

    {
      const token = localStorage.getItem("token")
      console.log(token)
      axios.patch('https://pratyushchauhan147.pythonanywhere.com/api/isvertrue/',{is_ver:1},{headers: {
        'Authorization': `Token ${token}`}} )
      .then((response)=> {
        console.log("Verified")
        console.log("verified")
        router.push("/")
      })
      .catch((error)=> {
        seterroroc(true)

      })
    }
    else{
      console.log("inc")
      console.log(props.otp)
      console.log(otpv)
    }

  }



  return (
    <div className='w-1/2 m-4 h-1/2 p-5 flex items-center justify-center  flex-col'>
       <input className=' drop-shadow-xl [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-[160px] h-28 flex flex-row font-bold justify-center items-center rounded-lg text-[64px] p-1' type="number" placeholder='0000'    maxLength={4} value={otpv} onChange={ (e)=>setotpv(e.target.value)}/>
       <button disabled={!otpcondition} className='px-4 py-1 m-4  disabled:bg-gray-400 disabled:text-gray-600 bg-blue-600 text-white rounded-lg flex justify-center items-center'  onClick={checkotp}> Submit</button>
    </div>
  )
}

export default Ver
