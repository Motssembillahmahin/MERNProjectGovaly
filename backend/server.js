const express = require('express');
const cors = require('cors'); // Import cors middleware
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const connectToDatabase = require('./config/db.js'); // Your DB connection file

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM GovalyCustomerDetails');

        if (result.recordset && result.recordset.length > 0) {
            res.json(result.recordset); // Send the data as JSON if records are found
        } else {
            res.json([]); // Send an empty array if no records are found
        }
    } catch (err) {
        console.error('Error fetching data:', err.message);
        res.status(500).json({ error: 'Database query failed', message: err.message });
    }
});

// Search users by Order_Number and Phone_Number
app.get('/users/search', async (req, res) => {
    const { orderNumber, phoneNumber } = req.query;

    try {
        const pool = await connectToDatabase();
        const query = `
            SELECT * FROM GovalyCustomerDetails
            WHERE 
                (@OrderNumber IS NULL OR Order_Number LIKE '%' + @OrderNumber + '%')
                or (@PhoneNumber IS NULL OR Phone LIKE '%' + @PhoneNumber + '%')
        `;

        const result = await pool
            .request()
            .input('OrderNumber', orderNumber || null)
            .input('PhoneNumber', phoneNumber || null)
            .query(query);

        if (result.recordset && result.recordset.length > 0) {
            res.json(result.recordset); // Send the filtered results
        } else {
            res.json([]); // Send an empty array if no results match the search criteria
        }
    } catch (err) {
        console.error('Error fetching search results:', err.message);
        res.status(500).json({ error: 'Database query failed', message: err.message });
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request received:', { username, password });

    try {
        const pool = await connectToDatabase();
        const query = `
            SELECT * FROM EmployeeDetails
            WHERE username = @Username
        `;
        const result = await pool
            .request()
            .input('Username', username)
            .query(query);

        console.log('Query result:', result.recordset);

        if (result.recordset.length === 0) {
            console.log('No user found');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.recordset[0];
        console.log('User fetched from DB:', user);

        if (password !== user.pass) {
            console.log('Password mismatch');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user.emp_id,
                username: user.username,
            },
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
});


app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
