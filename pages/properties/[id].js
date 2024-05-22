import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/router";
import NotVerified from '@/app/components/NotVerified'
import { useEffect, useState } from "react";
import TryLogin from "@/app/components/TryLogin";
import "../../app/globals.css"
import {motion } from "framer-motion";
import Head from "next/head";
function PropertyDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [property, setProperty] = useState(null);
    const [status, setstatus] = useState(null)
    const [checkin,setcheckin] = useState();
    const [guest,setguest] = useState();
    const [wait,setwait] = useState(false);
    const [checkout,setcheckout] = useState();
    

    const [search, setsearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setwait(true)
        const token = localStorage.getItem("token");
        axios.post('https://pratyushchauhan147.pythonanywhere.com/api/bookings/', {
            "check_in_date":checkin,
            "check_out_date":checkout,
            "guest":1,
            "owner":property.host.id,
            "property":property.id},
           { headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },}
        )
        .then((response) => {
            localStorage.setItem("token", token);
            setwait(false)
            router.push("/");
        }).catch((error) => {
            if (error.response) {
             console.log(error.response.data);
             // console.log(error.response.status);
             // console.log(error.response.headers);

        }})}
              


console.log(id)
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (id) {
            axios.get("https://pratyushchauhan147.pythonanywhere.com/api/properties/" + id, {
                headers: { Authorization: `Token ${token}` }})
            .then((res) => {
                setProperty(res.data);
                console.log(res.json)
                console.log(property)
            })
            .catch((err) => {
                 console.log(err); setstatus(err.response.status)});
        }
    }, [id]);

    if (!property) {
        if(status===401)
        {
            return <div><Navbar></Navbar><TryLogin></TryLogin></div>
        }
        if(status ==500)
        {
            return <div>Server Side error Occured </div>
        }
        if(status ==403)
        {
            return <div className='flex flex-col justify-center items-center'> <NotVerified></NotVerified> </div>
        }
    }
    else{

    return (
        <motion.div initial={{y:-100,backgroundColor: "#008080"}} animate={{y:0,backgroundColor:"#ffffff"}}>
             <Head>
        <title>RoulerStay-{property.title}</title>
      </Head>

            <Navbar sedisa={false} className="sticky"></Navbar>
            {wait? <div className="  flex-col fixed top-0 flex justify-center items-center left-0 bg-blue-600  "> <h1 className=" font-semibold text-white"> Booking Under progress Do not Refresh</h1> <Image src={"/loading.gif"} width={200} height={200} className="  p-6" ></Image> </div>: <div className=" hidden"></div> }
            <div className={" flex items-center flex-col"}>
                <div className={(wait?"hidden":"")+"center-container"}>
                    
                    <Image 
                        className={"rounded-lg shadow-lg  h-[500px]"}
                        src={property.photos[0].url}
                        alt={property.photos[0].alt_text}
                        width={600}
                        style={{objectFit: "contain", maxheight:"60%"}}
                        height={400}
                        />
                        <div className="infomation  w-full">
                        <h1 className="md:lg:text-[64px] text-[40px]   font-semibold color-text">{property.title}</h1>
                       <div className="flex md:flex-row justify-between flex-col item-center">
                        <div className=" sm:w-full md:lg:w-4/5  h-96 overflow-scroll  ">
                            {property.description}
                        </div>
                        <div className="">
                            
                            <div className="impinfo">
                                <h1 className="info_heading text-[24px] font-semibold color-text">Location:</h1> <h2 className="info_details color-text-light text-[20px] ">{property.location}</h2>
                            </div>
                            <div className="impinfo">
                                <h1 className="info_heading text-[24px] font-semibold color-text">Amenities:</h1> <h2 className="info_details color-text-light text-[20px] ">{property.amenities.map((amen)=>{return (<span key={amen.id}> {amen.name}</span>)})}</h2>
                            </div>

                            
                            
                        </div>

                       </div>
                        </div>
                     



                </div>
               <div className=" m-14 flex flex-col w-full justify-center items-center  p-3">
                <h1 className="text-4xl m-10 font-semibold">BOOK NOW HERE</h1>
                <form onSubmit={handleSubmit} className="space-y-5 w-4/5 p-16 bg-image  rounded-lg justify-center  items-center flex-col flex">

      <h1 className="text-2xl text-center text-orange font-semibold">Check in Date</h1> 
      <input
          type="date"
          name="available_start"
          onChange={(e)=>setcheckin(e.target.value)}
          required
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />

        
      <h1 className="text-2xl text-center  text-orange font-semibold">Check out Date</h1> 
        <input
          type="date"
          name="available_end"
          onChange={(e)=>setcheckout(e.target.value)}
          required
          placeholder="Start Date"
          className= "lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
          
        />
        <button
              className=" bg-blue-button  p-10  text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={wait?true:false}
            >
             {wait?"please wait...":"Book Now"}
            </button>
      </form>
      </div> 


            </div>

        </motion.div>    
           
  
    )}
}

export default PropertyDetails;
