
import Link from "next/link"
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./Navbar.css"
import {DateRangePicker} from "react-date-range";

import { useState } from "react"
const Navbar = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); 
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const handleClick = () => {
        fetch("");
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

  return (
   <div className="Navbar">
  <header className="transition-all group peer sticky h-20 top-0 z-50 px-5 py-2 bg-white shadow-md lg:flex items-center hidden lg:visible justify-between">

    <Link className="text-2xl md:text-3xl lg:text-4xl text-blue-500 font-bold group-hover:drop-shadow-lg" href="/">ROULER<span className="text-orange ">STAY</span></Link>

    <input
      disabled={!props.sedisa}
      type="text"
      name="search"
      placeholder="Search for"
      className="w-96 md:w-[400px] lg:w-[500px] disabled:hidden placeholder-italic placeholder-text-slate-400 bg-slate-100 border-blue-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-sky-500 focus:ring-1 sm:text-sm"
      onChange={e => { setSearchInput(e.target.value); props.search(e.target.value) }}
    />

    <div className=" linkstab flex items-center space-x-4 justify-end">
      <Link className="text-xs md:text-sm lg:text-base  group-hover:hover:text-gray-800 text-gray-400 hover:text-gray-700" href="/properties/createProperty">Host</Link>
      <Link className="text-xs md:text-sm lg:text-base  group-hover:hover:text-gray-800 text-gray-400 hover:text-gray-700" href="/">Home</Link>
      <Link className="text-xs md:text-sm lg:text-base  group-hover:hover:text-gray-800 text-gray-400 hover:text-gray-700" href="/bookings">Bookings</Link>
      <Link className="text-xs md:text-sm lg:text-base  group-hover:hover:text-gray-800 text-gray-400 hover:text-gray-700" href="/">Contact us</Link>

      <Link href="/login" className="text-gray-700">Login</Link>
    </div>
  </header>

{/* This for chotu chotu device */}
  <header className="transition-all group peer sticky h-40 top-0 z-50 px-5 py-2 bg-white shadow-md sm:md:flex flex-col  lg:hidden visible justify-center items-center">

<Link className=" items-center flex justify-center text-4xl m-2 text-blue-500 font-bold group-hover:drop-shadow-lg" href="/">ROULER<span className="text-orange">STAY</span></Link>

<input
  disabled={!props.sedisa}
  type="text"
  name="search"
  placeholder="Search for"
  className="w-full disabled:hidden placeholder-italic placeholder-text-slate-400 bg-slate-100 border-blue-300 rounded-md py-2 pl-9 pr-3 flex items-center justify-center shadow-sm focus:outline-none focus:ring-sky-500 focus:ring-1 "
  onChange={e => { setSearchInput(e.target.value); props.search(e.target.value) }}
/>

<div className=" linkstab flex items-center space-x-4 justify-center">
  <Link className="text-xs md:text-sm lg:text-base text-gray-400 hover:text-gray-700" href="/properties/createProperty">Host</Link>
  <Link className="text-xs md:text-sm lg:text-base text-gray-400 hover:text-gray-700" href="/">Home</Link>
  <Link className="text-xs md:text-sm lg:text-base text-gray-400 hover:text-gray-700" href="/bookings">Bookings</Link>
  <Link className="text-xs md:text-sm lg:text-base  text-gray-400 hover:text-gray-700" href="/">Contact us</Link>

  <Link href="/login" className="text-gray-700">Login</Link>
</div>
</header>

</div>

  )
}
Navbar.defaultProps = {
  search: "",
  sedisa:true
};
export default Navbar
