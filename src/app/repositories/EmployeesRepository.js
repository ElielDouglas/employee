// Repositorio que tem controle sobre nossa data layer
const db = require('../../database');

class EmployeesRepository {
  // Metodo que lista todos os dados
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM employes ORDER BY name ${direction}`);
    return rows;
  }

  // Metodo de busca de dado pelo ID unico
  async findById(id) {
    const [row] = await db.query('SELECT * FROM employes WHERE id = $1', [id]);
    return row;
  }

  // Metodo de busca por nome
  async findByName(name) {
    const [row] = await db.query('SELECT name FROM employes WHERE name = $1', [name]);
    return row;
  }

  // Criação de employee
  async create({ name, role }) {
    const [row] = await db.query(`INSERT INTO employes(name,role)
    VALUES($1, $2)
    RETURNING *`, [name, role]);
    return row;
  }

  // Deletar employee pelo seu ID
  async delete(id) {
    const deleteOp = await db.query('DELETE FROM employes WHERE id = $1', [id]);
    return deleteOp;
  }

  // Atualizar employee pelo seu id
  async update(id, { name, role }) {
    const [row] = await db.query(`UPDATE employes
    SET name = $1, role = $2
    WHERE id = $3
    RETURNING *`, [name, role, id]);
    return row;
  }
}

module.exports = new EmployeesRepository();
