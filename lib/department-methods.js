const inquirer = require('inquirer');
const mysql = require('mysql2');
const { startApp } = require('../index');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'employee_db'
});

const viewAllDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            console.table(results);
            startApp();
        }
    );
}

const addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department: '
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name)
                VALUES(?)`,
                [data.departmentName],
                function (error, results, fields) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }

                    console.log('Department added successfully!');
                    startApp();
                }
            );
        });
}

module.exports = { viewAllDepartments, addDepartment };
