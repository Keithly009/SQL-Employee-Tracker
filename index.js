
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDeparments } = require('./db/departments');
const { viewAllEmployees } = require('./db/employees');
// Using the async will help to avoid using .then() methods
const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const {choice} = await prompt([
        {
            type: "list", 
            name: "choice", 
            message: "What would you like to do?",
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role', 
                'Exit', 
            ]
        }
    ])
    
    switch (choice) { 
        case 'View all Department':
            const department = await viewAllDeparments()
            console.table(department)
            Break;

        case 'View all employees': 
            const Employee = await viewAllEmployees ()
            console.table(Employee)
            break;

        case 'View all Roles': 
            const Role = await viewAllRoles () 
            console.table(Role)
            break; 
        }
}

start();
