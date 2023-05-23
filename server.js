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
    db.query('SELECT * FROM employee;', function (err, results) {
        console.table(results);
        navigateChoices();
      });
}


navigateChoices();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});