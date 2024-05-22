import Image from "next/image"
import {motion ,useScroll,useInView } from "framer-motion";
import Link from "next/link";
import Head from 'next/head'
export default function Card({props}) {
  const { scrollYProgress } = useScroll()
  const variants = {
    active: {
        scale:1,
        y:0
    },
    shrink: {
      scale:0.9
  },
  appear: {
   opacity:1,
   scale:1,
},
    inactive: {
     scale:0.9,
     opacity:0.3
    }
  }
  return (

    <motion.div  variants={variants}  transition={{ type: "spring",stiffness: 500}}whileHover="shrink" initial="inactive" whileInView="appear" className="w-1/4 w min-w-[300px]  border-gray-100 flex justify-center items-center  md:flex-row">
        <Link href={"/properties/" + props.id} className=" m-4 rounded-lg hover:cursor-pointer md:flex-row ">
            {props.photos && 
                props.photos.map((photo) => {
                    return (
                        <Image
                  
                        className="rounded-lg"
                        key={photo.id}
                        src={photo.url}
                        alt={photo.alt_text}
                        width={300}
                        height={200}
                        style={{objectFit:"cover",maxHeight:"300px"}}
                        />
            )})}
            <p className="font-semibold">{props.location}</p>
            <p>Stay with {props.host.username}</p>
            <p>{props.title}</p>
            <p>{props.available_start} - {props.available_end}</p>
            <p className="font-bold">{props.price}Rs./night</p>
        </Link>
    </motion.div>
  )
}
