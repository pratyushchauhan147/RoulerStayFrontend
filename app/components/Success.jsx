
const Succsess = (props) => {
  console.log(props.mgs)
  return (
    <div className=" bg-green-100 p-2 rounded-lg">
      
        <h1 className=" font-semibold text-red  text-[20px]"> 
        {props.msg}  
        </h1>
  
      
    </div>
  )
}

export default Succsess
