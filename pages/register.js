import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import "../app/globals.css";

import Error from "@/app/components/Error";
import Link from "next/link";
import "../app/components/register.css"
export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [error, seterror] = useState(false);
  const [errorDe, seterrorDe] = useState("");
  var errordata =[]
  const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
          seterror(true)
          seterrorDe("Password Do not match")
            
            return;
        }

        axios.post('https://pratyushchauhan147.pythonanywhere.com/api/registration/', {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
        })
        .then((response) => {
            localStorage.setItem("token", response.data.key);
            router.push("/");
        })
        .catch((error) => {
            if (error.response) {
              seterror(true)
              errordata = error.response.data
                console.log(error.response.data);
                console.log (Object.keys(error.response.data).length);
               // console.log(error.response.status);
                //console.log(error.response.headers)
                if(Object.keys(errordata).length > 1)
                {
                  seterrorDe("Fill The Details Properly")
      
                }
                 else if( errordata.password1 )
                {
                  seterrorDe(errordata.password1[0] ) 
                }
                else if( errordata.email )
                {
                  seterrorDe(errordata.email[0] ) 
                }
                else if( errordata.username )
                {
                  seterrorDe(errordata.username[0] ) 
                }
               // seterrorDe([...errordata])
                console.log(errordata)
      




            }
        });
    };

    return (
        <div className="Login">
     <Link href={"/"}> <div className=" h-9 w-16 fixed left-[90%] top-[10%] flex items-center justify-center text-white rounded-md bg-blue-500"><h1>Home</h1></div></Link>

      <div className="back flex flex-row">
        <div className="left2">
        </div>
        <div className="right2">
          <div className="loginbox2">
            <h1 className="text-blue text-[64px] font-semibold center-text">Rouler<span className="text-orange text-[64px] font " >Stay</span></h1>
              <h1 className="text-[28px] color-text font-bold ">Sign Up/ Register</h1>
              <form onSubmit={handleRegister} className="input">

              {error?<Error err={errorDe}></Error>:console.log('no error')}


              <div className="inputbox2">
                <h2 className=" font-semibold color-text text-[14px]  my-1">Username</h2>
                <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> </div>

            <div className="inputbox2">
            <h2 className=" font-semibold color-text text-[14px]  my-1">Email</h2>
            <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> </div>




              <div className="inputbox2">
                <h2 className=" font-semibold color-text text-[14px]  my-1">Password</h2>
                <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password1"
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)} />
              </div>

              <div className="inputbox2">
                <h2 className=" font-semibold color-text text-[14px]  my-1">Confirm Password</h2>
                <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password2"
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)} />
              </div>




              <div className="flex items-center justify-between">
            <button
              className=" bg-blue-button  p-10  text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Resister
            </button>

          </div>
          <Link href={"/login"} className="text-blue-600 underline">Already a User ? Login</Link>

              </form>

          </div>
        </div>

      </div>

    </div>
  )
}
