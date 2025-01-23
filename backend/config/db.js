const sql = require('mssql');

const config = {
    user: 'sa',                 // SQL Server login username
    password: '',    // SQL Server login password
    server: '',        // Replace with actual server name or IP
    database: '', // Target database name
    options: {
        encrypt: true,              // Use encryption for Azure connections
        trustServerCertificate: true // Accept self-signed certificates
    },
    port: 1433                     // Default port for SQL Server
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

module.exports = connectToDatabase;
