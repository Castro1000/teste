// server.js (Backend)

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3306; // Porta do servidor Node.js

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: '192.168.1.197',
  user: 'root',
  password: '',
  database: 'sgveauto',
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para buscar produtos
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  const sql = `SELECT Descricao, Preco, Quantidade FROM produto WHERE Descricao LIKE ?`;
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error('Erro ao buscar os dados:', err);
      res.status(500).send('Erro ao buscar os dados');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
