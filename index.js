
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require('./db/departments');
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
                'Add new department',
                'Add a role', 
                'Add an employee', 
                'Update an employee role', 
                'Delete a department', 
                'Delete a Role',  
                'Delete an Employee',
                'Exit', 
            ]
        }
    ])
    console.log(choice)
    switch (choice) { 
        case 'View all departments':
            const department = await viewAllDepartments()
            console.table(department)
            break;

        case 'View all employees': 
            const Employee = await viewAllEmployees ()
            console.table(Employee)
            break;

        case 'View all role': 
            const Role = await viewAllRoles () 
            console.table(Role)
            break; 
        case 'Add New department':
            const NewDepartment = await NewDepartment()
            console.table(NewDepartment)
            break;
        case 'Add New Role': 
            const NewRole = await addnewrole()
            console.table(NewRole) 
            break; 
        case 'Add New Employee': 
            const NewEmployee = await NewEmployee()
            console.table(NewEmployee) 
            break; 
        case 'Remove Employee': 
            const RemoveEmployee = await RemoveEmployee() 
            console.table(RemoveEmployee) 
            break;
        case 'Delete a Department': 
            const DeleteDepartment = await DeleteDepartment() 
            console.table(DeleteDepartment)
            break; 
        case 'Delete a Role': 
            const DeleteRole = await DeleteRole()
            console.table(DeleteRole)
            break;  

        case 'Exit': 
            console.log("Farewell Friend!"); 
        }
}

start();
