const inquirer = require('inquirer');
const mysql = require('mysql2');
const { startApp } = require('../index');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employee_db'
});

const calculateTotalBudgetByDepartment = () => {
    connection.query(`SELECT * FROM department`,
        function (error, results) {
            if (error) {
                console.log(error.message);
                return;
            }

            const departmentNames = results.map(item => item.name);

            inquirer
                .prompt({
                    type: 'list',
                    name: 'selectedDepartment',
                    message: 'Select a department to view the total budget:',
                    choices: departmentNames
                })
                .then((data) => {
                    let departmentId;
                    for (let i = 0; i < departmentNames.length; i++) {
                        if (departmentNames[i] === data.selectedDepartment) {
                            departmentId = i + 1;
                            break;
                        }
                    }

                    connection.query(
                        `SELECT department.name AS department, SUM(roles.salary) AS total_salary
                        FROM employee
                        LEFT JOIN roles
                        ON employee.role_id = roles.id
                        LEFT JOIN department
                        ON roles.department_id = department.id
                        WHERE department_id = ?`,
                        [departmentId],
                        function (error, results) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }

                            console.table(results);
                            startApp();
                        }
                    );
                });
        }
    );
};

module.exports = { calculateTotalBudgetByDepartment };
