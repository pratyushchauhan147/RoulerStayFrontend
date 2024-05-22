import Image from "next/image";
import Input from "postcss/lib/input";
import { useRouter } from "next/router";
import { useState } from "react";
import "../app/globals.css";
import "../app/components/Login.css"
import axios from "axios";
import Link from "next/link";
import Error from "@/app/components/Error";
export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorDe, seterrorDe] = useState("");
  const router = useRouter();
 var errordata =[]

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://pratyushchauhan147.pythonanywhere.com/api/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.key);
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
         // console.log(error.response.data);
         // console.log(error.response.status);
         // console.log(error.response.headers);
          seterror(true)
          errordata = error.response.data
          
          if(errordata.password )
          {
            seterrorDe("Enter the Password Please")

          }
          if(errordata.non_field_errors )
          {
            if(errordata.non_field_errors[0] === 'Unable to log in with provided credentials.')
            {
              
              seterrorDe("Invalid Credentials , if new please Sighn up ")
            }
            else{
              seterrorDe(errordata.non_field_errors[0])
            }

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
        <div className="left visible">
        </div>
        <div className="right">
          <div className="loginbox">
            <h1 className="text-blue text-[64px] font-semibold center-text">Rouler<span className="text-orange  text-[64px] font " >Stay</span></h1>
              <h1 className="text-[28px] color-text font-bold ">Login</h1>
              
              <form onSubmit={handleLogin} className="input">
              {error?<Error err={errorDe}></Error>:console.log('no error')}



              <div className="inputbox">
                <h2 className=" font-semibold color-text text-[14px]  my-1">Username</h2>
                <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

                

              </div>

              <div className="inputbox">
                <h2 className=" font-semibold color-text text-[14px]  my-1">Password</h2>
                <input
              className="shadow appearance-none border rounded w-[500px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
              </div>
              <div className="flex items-center justify-between">
            <button
              className=" bg-blue-button  p-10  text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>

          </div>
          <Link href={"/register"} className="text-blue-600 underline">Are you a New User?Sign Up</Link>
          
              </form>
              

          </div>
        </div>

      </div>

    </div>
    
  );
}

