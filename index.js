const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection config
// triggering azure deployment
const db = mysql.createConnection({
  host: 'vishnuserver.mysql.database.azure.com',
  user: 'Vishnu',
  password: 'Vishnu@123',
  database: 'studentdb',
  port: 3306,
  ssl: {
    rejectUnauthorized:false
  }
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
