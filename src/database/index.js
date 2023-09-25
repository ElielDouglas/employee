const { Client } = require('pg');

// Passa os parametros do banco ao cliente do banco Postgres
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'employes',
});

// Conecta no banco de dados
client.connect();

// exportando a função de criação query para nao necessitar ficar criando novas instancias toda hora
exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
