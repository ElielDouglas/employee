const EmployeesRepository = require('./repositories/EmployeesRepository');

async function insertEmployee(employeeData) {
  const name = employeeData.name.first;
  const { nat: role } = employeeData;

  // Passa a função ao repositorio
  const employee = await EmployeesRepository.create({
    name, role,
  });
  return employee;
}

// Exporte a função se você estiver usando módulos (CommonJS, ES6 Modules, etc.)
module.exports = {
  insertEmployee,
};
