import Link from "next/link"
const TryLogin = () => {
  return (
    <div className="h-full w-5/4 flex justify-center m-4 items-center" >
        <div className="h-full w-4/5 text-center  border-gray-200 rounded-lg border-2 flex-col flex justify-center items-center ">
            <h1 className="font-semibold text-blue text-[64px] "> <span className="text-orange" >You Need To</span> Log in</h1>
            <h1>
                <Link className=" text-blue  underline text-[38px]" href={"/login"}>Log in</Link>
            </h1>
        </div>
       
      
    </div>
  )
}

export default TryLogin
