import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import UserTable from './UserTable.js';
import './Main.css';


const Main = () => {
    const [users, setUsers] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const query = new URLSearchParams({
                orderNumber,
                phoneNumber,
            }).toString();

            const response = await fetch(`http://localhost:8080/users/search?${query}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div className="main-container">
            <SearchBar
                orderNumber={orderNumber}
                phoneNumber={phoneNumber}
                setOrderNumber={setOrderNumber}
                setPhoneNumber={setPhoneNumber}
                handleSearch={handleSearch}
            />
            <UserTable users={users} />
        </div>
    );
};

export default Main;
