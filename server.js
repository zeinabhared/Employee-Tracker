const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
},
    console.log(`Connected to the employees_db database.`)
);