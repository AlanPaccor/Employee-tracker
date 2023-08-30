const inquirer = require('inquirer');
const {
  viewAllEmployees,
  viewEmployeesByDepartment,
  viewEmployeesByManager,
  addEmployee,
  updateEmployeeRole,
} = require('./lib/employee');
const { viewDepartments, addDepartment } = require('./lib/department-methods');
const { viewRoles, addRole } = require('./lib/roles-methods');
const { calculateTotalBudgetByDepartment } = require('./lib/calculations');

const startApp = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'menuChoice',
      message: 'Select an action:',
      choices: [
        'View All Employees',
        'View Employees By Department',
        'View Employees By Manager',
        'Add Employee',
        'Update Employee Role',
        'View Departments',
        'Add Department',
        'View Roles',
        'Add Role',
        'Calculate Total Budget By Department',
        'Exit',
      ],
    })
    .then((data) => {
      switch (data.menuChoice) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View Employees By Department':
          viewEmployeesByDepartment();
          break;
        case 'View Employees By Manager':
          viewEmployeesByManager();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Calculate Total Budget By Department':
          calculateTotalBudgetByDepartment();
          break;
        case 'Exit':
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid choice. Please select a valid option.');
          break;
      }
    });
};

startApp();
