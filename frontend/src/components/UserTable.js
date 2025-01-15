import React from 'react';
import './UserTable.css';


const UserTable = ({ users }) => {
    return (
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
                {users.length > 0 ? (
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
    );
};

export default UserTable;
