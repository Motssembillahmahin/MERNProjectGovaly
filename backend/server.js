const express = require('express');
const connectToDatabase = require('./config/db.js'); // Adjust path if necessary

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM GovalyCustomerDetails');
    res.json(result.recordset); // Send the data as JSON
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ error: 'Database query failed', message: err.message });
  }
});

app.listen(8081, () => {
  console.log('Server running on http://localhost:8081');
});
