
const Error = (props) => {
  console.log(props.err)
  return (
    <div className=" bg-red-100 p-2 rounded-lg">
      
        <h1 className=" font-semibold text-red  text-[20px]"> 
        {props.err}  
        </h1>
  
      
    </div>
  )
}

export default Error
