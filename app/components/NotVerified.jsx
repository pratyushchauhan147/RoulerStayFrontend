import React from 'react'
import Link from 'next/link'
import "../globals.css"
const NotVerified = () => {
  return (
    <div className='flex w-1/2 h-28 justify-center flex-col items-center rounded-lg m-2 bg-gray-300'>
        <h1> Looks like Your Email is not Verified </h1>
        <Link className=' px-4 py-1  bg-blue-600 text-white rounded-lg flex justify-center items-center' href={"/verify"}> Verify</Link>
    </div>
  )
}

export default NotVerified
