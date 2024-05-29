const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({ //Elizeu //
  host: '192.168.1.197',
  user: 'root',
  password: '',
  database: ''
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.get('/search', (req, res) => { //Elizeu//
  const query = req.query.q;
//  const sql = `SELECT description, price, quantity, branch FROM tires WHERE description LIKE ?`;
const sql = `SELECT Descricao, Preco, Quantidade,Cod_marca FROM produto WHERE Descricao LIKE Descricao ?`;
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
