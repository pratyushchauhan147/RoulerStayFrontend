import Navbar from "@/app/components/Navbar"
import Card from "@/app/components/Card"
import Head from "next/head"
import "../app/globals.css"
import { useEffect,useState } from "react"
import Router from "next/router"

export default function Home({hotels}) {
    const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [c, setc] = useState(1)

 
  useEffect(() => {
    fetch('https://pratyushchauhan147.pythonanywhere.com/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
        console.log(c)
      })
  }, [])
  return (
      <div>
          <Head>
              <title>Bookit</title>
          </Head>

          {/* Navbar */}
          <Navbar></Navbar>

          {/* Cards */}
          <div className=" wrap flex-col mx-5 my-7">
              <h1 className="text-3xl font-semibold mb-3">Properties</h1>
              <section className="flex wrap">
                  {hotels.map((hotel) => {
                      return <Card key={hotel.id} props={hotel} />;
                  })}
              </section>
              <button onClick={(e)=>{ e.preventDefault;setc(c+1)}}>press</button>
              
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
