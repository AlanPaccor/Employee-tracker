const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'employee_db'
});

const dropManagerTable = () => {
    dbConnection.query(
        `DROP TABLE IF EXISTS managers`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
            console.log('Dropped managers table');
        }
    );
};

const createManagerTable = () => {
    dbConnection.query(
        `CREATE TABLE managers (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(30),
            last_name VARCHAR(30),
            PRIMARY KEY (id)
        )`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
            console.log('Created managers table');
        }
    );
};

const populateManagersTable = () => {
    dbConnection.query(
        `INSERT INTO managers (first_name, last_name)
        SELECT first_name, last_name
        FROM employees
        WHERE manager_confirm = 1`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
            console.log('Populated managers table');
        }
    );
};

module.exports = {
    dropManagerTable,
    createManagerTable,
    populateManagersTable
};
