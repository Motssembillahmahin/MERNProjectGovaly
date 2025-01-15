import React from 'react';
import './SearchBar.css';


const SearchBar = ({ orderNumber, phoneNumber, setOrderNumber, setPhoneNumber, handleSearch }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
