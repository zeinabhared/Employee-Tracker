const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Charmedpop99!',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

// Establishing the connection
connection.connect(function (err) {
    if(err) throw err;
    initialAction();
})

// Welcome message
console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

// Initial action question 
const initialAction = async() => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employee':
                employeeAdd();
                break

            case 'Add Department':
                departmentAdd();
                break

            case 'Add Role':
                roleAdd();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch(err) {
        console.log(err);
        initialAction();
    };
}

// Selection to view all of the employees
const employeeView = async() => {
    console.log('Employee View');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if(err) throw err;
            let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to view all of the departments
const departmentView = async() => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if(err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            initialAction();
        });
    } catch(err) {
        console.log(err);
        initialAction();
    };
}

// Selection to view all of the roles
const roleView = async() => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initialAction();
        });
    } catch(err) {
        console.log(err);
        initialAction();
    };
}

// Selection to add a new employee
const employeeAdd = async() => {
    try {
        console.log('Add an Employee');

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the employee?'
            },
            {
                name: 'employeeRoleId',
                type: 'input',
                message: "What is the employee's role ID?"
            },
            {
                name: 'employeeManagerId',
                type: 'input',
                message: "What is the employee's manager's ID?"
            }
        ])

        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} was added successfully.\n`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to add a new department
const departmentAdd = async() => {
    try {
        console.log('Add a new Department');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the new department?'
            }
        ]);

        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} was added successfully to departments.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to add a new role
const roleAdd = async() => {
    try {
        console.log('Add a new Role');

        let departments = await connection.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What salary will this role provide?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'What department ID is this role associated with?',
            }
        ]);
        
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })

        console.log(`${answer.title} role added successfully.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to update a role for an employee
const employeeUpdate = async() => {
    try {
        console.log('Update an Employee');
        
        let employees = await connection.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Please choose an employee to update.'
            }
        ]);

        let roles = await connection.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);

        let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`The role was successfully updated.\n`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}
