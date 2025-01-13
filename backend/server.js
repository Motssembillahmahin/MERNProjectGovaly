const express = require('express');
const cors = require('cors'); // Import cors middleware
const connectToDatabase = require('./config/db.js'); // Your DB connection file

const app = express();
app.use(express.json());
app.use(cors());

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
                AND (@PhoneNumber IS NULL OR Phone LIKE '%' + @PhoneNumber + '%')
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

app.listen(8081, () => {
    console.log('Server running on http://localhost:8081');
});
