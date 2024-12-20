

import { createConnection } from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  //user: "",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Exit the application on connection error
  }
  console.log('Connected to MySQL Database');
});

export default db;

