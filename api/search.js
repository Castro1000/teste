//pasta api ./search.js

const mysql = require('mysql');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: '192.168.1.197',
  user: 'root',
  password: '',
  database: 'sgveauto',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

export default function handler(req, res) {
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
}
