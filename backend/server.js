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
  database: 'sgveauto'
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
  const sql = `SELECT Descricao, Preco, Quantidade, FROM produto WHERE Descricao LIKE ?`;

  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao executar a consulta no banco de dados.' });
      return;
    }
    res.json(results);
  });
});

const PORT = 3000; // Alterado para a porta padrão do Express
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
