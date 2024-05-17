const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  const sql = `SELECT description, price, quantity, branch FROM tires WHERE description LIKE ?`;
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
