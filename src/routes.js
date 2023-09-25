const { Router } = require('express');

const EmployeeController = require('./app/controllers/EmployeeController');

const router = Router();

// Employee Routes
router.get('/hello', EmployeeController.hello); // Rota padrão para a mensagem "hello, cognum"
router.get('/employee', EmployeeController.index); // Rota com a listagem de todos os dados da tabela
router.get('/employee/:id', EmployeeController.show); // Rota para listagem de apenas um usuario pelo seu ID
router.delete('/employee/:id', EmployeeController.delete); // Rota para deletar um usuario pelo seu ID
router.post('/employee', EmployeeController.store); // Rota para criar um novo dado
router.put('/employee/:id', EmployeeController.update); // Rota para atualizar um dado pelo seu ID
router.get('/populate', EmployeeController.populate);
module.exports = router;
