const { promptUser } = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'employee_db'
});

const viewRoles = () => {
    dbConnection.query(
        `SELECT roles.id, roles.title, roles.salary, department.name AS department
            FROM roles
            LEFT JOIN department
            ON roles.department_id = department.id`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            console.table(results);
            promptUser();
        }
    );
};

const addRole = () => {
    dbConnection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            let departmentArr = [];
            results.forEach(item => {
                departmentArr.push(item.name);
            });

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'Please enter the name of the role you would like to add: '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Please enter the salary of this role. Note: Please do not use commas or periods'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department your role will be a part of: ',
                        choices: departmentArr
                    }
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i < departmentArr.length; i++) {
                        if (departmentArr[i] === data.department) {
                            department_id = i + 1;
                        }
                    }

                    dbConnection.query(
                        `INSERT INTO roles (title, salary, department_id)
                            VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (error, results, fields) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }

                            console.log('Role added!');
                            promptUser();
                        }
                    );
                });
        }
    );
};

module.exports = { viewRoles, addRole };
