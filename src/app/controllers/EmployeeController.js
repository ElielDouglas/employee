// Importa o repositorio de employee.
// que é onde se encontra todo o acesso a data layer do nosso projeto
const axios = require('axios');
const EmployeesRepository = require('../repositories/EmployeesRepository');
const insert = require('../InsertEmployee');

class EmployeeController {
  // Rota padrão Hello , como solicitado no teste
  hello(req, res) {
    res.status(200).json({
      message: 'Hello,Cognum!',
    });
  }

  // Rota padrão para o endpoint GET - /employee, listando todos os dados
  async index(req, res) {
    // Listar todos os registros
    const { orderBy } = req.query;
    const employee = await EmployeesRepository.findAll(orderBy);

    res.json(employee);
  }

  // Função controller para o endpoint POST - /employee, criando um employee
  async store(req, res) {
    // Criar um novo employee
    const {
      name, role,
    } = req.body; // Extrai os dados passados no corpo da requisição

    // validação obrigatoria de nome e role
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    // Passa a função ao repositorio
    const employee = await EmployeesRepository.create({
      name, role,
    });

    // devole ao usuario o dado criado
    res.json(employee);
  }

  // Função controller para o endpoint GET - /employee/:id
  // para receber o ID na url e listar apenas aquele usuario
  async show(req, res) {
    // Obter UM registro
    const { id } = req.params;
    const employee = await EmployeesRepository.findById(id);

    if (!employee) {
      // 404: Not Found
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(employee);
  }

  // Função controller para o endpoint DELETE - /employee/:id
  // para receber o ID na url e deletar aquele usuario
  async delete(req, res) {
    // Deletar um registro
    const { id } = req.params;
    const employee = await EmployeesRepository.findById(id);
    if (!employee) {
      // 404: Not Found
      return res.status(404).json({ error: 'User not found' });
    }

    await EmployeesRepository.delete(id);
    // 204: No Content
    res.sendStatus(204);
  }

  // Função controller para o endpoint PUT - /employee/:id
  // para receber o ID na url e atualizar aquele dado
  async update(req, res) {
    // Editar um registro
    const { id } = req.params;
    const {
      name, role,
    } = req.body; // Extrai os dados a serem atualizados do body da request

    // valida se o employee existe antes de tentar atualizar
    const employeeExists = await EmployeesRepository.findById(id);
    if (!employeeExists) {
      res.status(404).json({ error: 'User not found' });
    }
    // verifica se os dados obrigatórios nao estao vindo vazios
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const employee = await EmployeesRepository.update(id, {
      name, role,
    });

    res.json(employee);
  }

  async populate(req, res) {
    try {
      const { data } = await axios.get('https://randomuser.me/api/?inc=gender,name,nat&results=10');
      const newUsers = data.results;

      const results = await Promise.all(newUsers.map((user) => (
        insert.insertEmployee(user)
      )));

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao popular os dados.' });
    }
  }
}

module.exports = new EmployeeController();
