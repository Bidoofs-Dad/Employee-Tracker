const express = require('express');
const inquirer = require("inquirer");
const db = require('./db/connection');
// const tables = require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});

//The function that will be in control of making the selections, will be called back to from every other function
const navigateChoices = () => {
    inquirer.prompt({
        type: 'list',
        name: 'navigate',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role'],
        // this will deploy a function based off of what choice you make, these are placeholder names as I havent written the functions yet
    }).then(answer => {
        switch (answer.navigate) {
            case 'View All Departments':
                viewAllDepartments();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'Add A Department':
                addADepartment();
                break;

            case 'Add A Role':
                addARole();
                break;

            case 'Add An Employee':
                addAnEmployee();
                break;

            case 'Update An Employee Role':
                updateAnEmployeeRole();
                break;
        }
    })
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const viewAllRoles = () => {
    db.query('SELECT * FROM role;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const viewAllEmployees = () => {
    db.query('SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const addADepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "newDepartment",
        message: "What would you like to name your new department?"

    }).then((answer) => {
        db.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], (err, results) => {
            db.query("SELECT * FROM department", (err, results) => {
                console.table(results);
                navigateChoices();
            })
        })
    })
};

const addARole = () => {
    inquirer.prompt([{
        type: "input",
        name: "jobTitle",
        message: "What would you like to name your new job title?"
    },
    {
        type: "number",
        name: "salary",
        message: "How much does this new position pay?"
    },
    {
        type: "number",
        name: "departmentID",
        message: "What is the Department ID associated with this new position?"
    }
    ]).then((answer) => {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.jobTitle, answer.salary, answer.departmentID], (err, results) => {
            db.query("SELECT * FROM role", (err, results) => {
                console.table(results);
                navigateChoices();
            })
        })
    })
};

// const addAnEmployee = () => {
//     db.query('SELECT * FROM role;', function (err, results) {
//         console.table(results);
//         navigateChoices();
//     });
// }

// const updateAnEmployeeRole = () => {
//     db.query('SELECT * FROM role;', function (err, results) {
//         console.table(results);
//         navigateChoices();
//     });
// }


navigateChoices();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});