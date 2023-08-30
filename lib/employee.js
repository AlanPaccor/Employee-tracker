const inquirer = require('inquirer');
const mysql = require('mysql2');
const { initializeApp } = require('../index');
const { resetManagers, createManagerTable, populateManagers } = require('./reset-methods');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'employee_db'
});

const viewAllEmployees = () => {
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, 
        roles.salary AS salary, manager.first_name AS manager, department.name AS department 
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        LEFT JOIN manager ON employee.manager_id = manager.id`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            console.table(results);
            initializeApp();
        }
    );
};

const viewEmployeesByDepartment = () => {
    connection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            const departmentNames = results.map(item => item.name);

            inquirer
                .prompt({
                    type: 'list',
                    name: 'departmentChoice',
                    message: 'Select a department to filter employees:',
                    choices: departmentNames
                })
                .then(data => {
                    connection.query(
                        `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department
                        FROM employee
                        LEFT JOIN roles ON employee.role_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        WHERE department.name = ?`,
                        [data.departmentChoice],
                        function (error, results, fields) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }

                            console.table(results);
                            initializeApp();
                        }
                    );
                });
        }
    );
};

// ... (other functions)

module.exports = {
    viewAllEmployees,
    viewEmployeesByDepartment,
    // ... (other exported functions)
};
