
import React from 'react';

const DropDownProperty= (props) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="house">House</option>
        <option value="noManArea">No man area</option>
        <option value="villa">Villa</option>
        <option value="lighthouse">Lighthouse</option>
        <option value="guesthouse">Guesthouse</option>
        <option value="cabin">Cabin</option>
        <option value="bungalow">Bungalow</option>
        <option value="apartment">Apartment</option>
        <option value="2Star">2 Star</option>
        <option value="4Star">4 Star</option>
        <option value="5Star">5 Star</option>
        <option value="floatel">Floatel</option>
        <option value="forestHotels">Forest hotels</option>
        <option value="resort">Resort</option>
        <option value="airportHotel">Airport hotel</option>
        <option value="motel">Motel</option>
        <option value="suburbanHotels">Suburban hotels</option>
      </select>
      <p>You selected: {selectedOption}</p>
    </div>
  );
};

export default DropDownProperty;
