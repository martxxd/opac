const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import CORS
const app = express();
const port = 5000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'opac_db'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());  // Add CORS middleware

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

// Route to fetch data from 'books' table
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books'; // Adjust the query to your table
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

// Route to add a book to the 'books' table
app.post('/books', (req, res) => {
  const { title, author, published_year } = req.body;
  const query = 'INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)';
  db.query(query, [title, author, published_year], (err, results) => {
    if (err) {
      res.status(500).send('Error inserting data into the database');
    } else {
      res.status(201).send('Book added successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
