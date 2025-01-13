import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Fetch all users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8081/users');
            const data = await response.json();

            // Ensure the response is an array
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Unexpected JSON format:', data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleSearch = async () => {
        try {
            const query = new URLSearchParams({
                orderNumber,
                phoneNumber,
            }).toString();

            const response = await fetch(`http://localhost:8081/users/search?${query}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Unexpected JSON format:', data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error searching users:', error);
            setUsers([]);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Govaly Customer Details</h1>

                {/* Search Inputs */}
                <div>
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

                {/* Data Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Products</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.Order_Number}</td>
                                    <td>{user.Customer_Name.trim()}</td>
                                    <td>{user.Phone.trim()}</td>
                                    <td>{user.Address}</td>
                                    <td>{user.Products}</td>
                                    <td>{new Date(user.Time).toLocaleDateString()}</td>
                                    <td>{user.Price}</td>
                                    <td>{user.Vendor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </header>
        </div>
    );
}

export default App;
