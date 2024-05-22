import { useRouter } from "next/router";
import { useState } from "react";
import "../../app/globals.css"
import Navbar from "@/app/components/Navbar";
import Error from "@/app/components/Error";
export default function createProperty() {
  const BASE_URL = "https://pratyushchauhan147.pythonanywhere.comapi";

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    available_start: "",
    available_end: "",
    photos: [{ url: "", alt_text: "Room Image" }],
    rooms: [{ name: "", capacity: 3 }],
    amenities: [{ name: "", }],
    property_type: { name: "" },
    location_address:"",
  });
  const [error, seterror] = useState(false);
  const [errorDe, seterrorDe] = useState("");
  const router = useRouter();

  const handleChange = (e, parentField = null, index = null) => {
    if (parentField) {
      let newItem = null;
      if (index !== null) {
        newItem = [...formState[parentField]];
        newItem[index][e.target.name] = e.target.value;
      } else {
        newItem = formState[parentField];
        newItem[e.target.name] = e.target.value;
      }

      setFormState({ ...formState, [parentField]: newItem });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formState),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/properties/" + data.id);
    } else {
      console.error(data);
      seterror(true);
      seterrorDe("Fill details Properly, make sure price dont exceed 6 digit")
    }
  };
  
  const amenities = ["NA", "not available", "others", "wifi", "Gym or fitness center", "Free parking", "Free WiFi internet access", "Free breakfast", "Bathrobes and slippers", "Coffee Kit", "Toiletries"];
  const propertyTypes = ["house", "No man area", "villa", "lighthouse", "house", "guesthouse", "cabin", "bungalow", "apartment", "Villa", "2 Star", "4 Star", "5 Star", "Floatel", "Forest hotels", "Resort", "Airport hotel", "Motel", "Suburban hotels"];

  return (
    <>
    <Navbar></Navbar>
    <div className="container flex flex-col mx-auto my-10 justify-center  items-center">
      
      <h1 className="my-5 text-[65px] font-semibold">Create Property</h1>
      <form onSubmit={handleSubmit} className="space-y-5 w-4/5 p-16 bg-image  rounded-lg justify-center  items-center flex-col flex">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <textarea
          placeholder="description"
          name="description"
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_start"
          onChange={handleChange}
          required
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_end"
          onChange={handleChange}
          required
          placeholder="Start Date"
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          onChange={(e) => handleChange(e, "photos", 0)}
          className="  lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="location_address"
          placeholder="Location Map link"
          onChange={handleChange}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          onChange={(e) => handleChange(e, "rooms", 0)}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        />
         <select
          name="name"
          onChange={(e) => handleChange(e, "amenities", 0)}
          className=" lg:md:w-1/2 sm:w-full p-2 border border-gray-200 rounded"
        >
          {amenities.map((amenity, index) => (
            <option key={index} value={amenity}>{amenity}</option>
          ))}
        </select>
        <select
          name="name"
          onChange={(e) => handleChange(e, "property_type")}
          className=" w-1/2 p-2 border border-gray-200 rounded"
        >
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        {error?<Error err={errorDe}></Error>:console.log('no error')}
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Property
        </button>
      </form>
    </div>
    </>
  );
}
