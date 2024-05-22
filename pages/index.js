import Navbar from "@/app/components/Navbar"
import Card from "@/app/components/Card"
import Head from "next/head"
import {motion,useScroll } from "framer-motion";
import "../app/globals.css"
import { useEffect,useState } from "react"
import Router from "next/router"
import Empty from "@/app/components/Empty"
export default function Home({hotels}) {
    const [data, setData] = useState(hotels)
    const [search, setsearch] = useState("");
  const [isLoading, setLoading] = useState(true)
  const [c, setc] = useState(1)

  const { scrollYProgress } = useScroll()
  useEffect(() => {
    fetch('https://pratyushchauhan147.pythonanywhere.com/api/properties?search='+search)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
        console.log(c)
      })
  }, [search])
  return (
      <div>
          <Head>
              <title>Bookit</title>
          </Head>

          {/* Navbar */}
          <Navbar  search={setsearch}></Navbar>

          {/* Cards */}
          <div></div>
          <div className=" wrap flex-col mx-5 my-7">
              <h1 className="text-3xl font-semibold mb-3">Properties</h1>
              <motion.section initial={{scale:1}} animate={{scale:1}} className="flex wrap">
                  {data.map((hotel) => {
                      return <Card key={hotel.id} props={hotel} />;
                  })}
              </motion.section>
              { data.length<=1?<Empty/>:console.log("bhara hai bhai ")}
            
          
              
          </div>
      </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://pratyushchauhan147.pythonanywhere.com/api/properties");
  const hotels = await res.json();
  console.log(hotels)

  return {
      props: { hotels }
  };
}
