const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3306;

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: '473702ab5104.sn.mynetname.net',
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

// Rota para obter os usuários
app.get('/usuarios', (req, res) => {
  const query = 'SELECT nome, login FROM usuario';
  db.query(query, (err, results) => {
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
