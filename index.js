
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, AddDepartment, RemoveDepartment } = require('./db/departments');
const { viewAllEmployees, removeEmployee, addEmployees  } = require('./db/employees');
const { viewAllRoles, AddRole, RemoveRoles } = require('./db/roles');
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
                'Add new role', 
                'Add an employee', 
                'Update an employee role', 
                'Delete a department', 
                'Delete a Role',  
                'Remove Employee',
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

        case 'View all roles': 
            const Role = await viewAllRoles () 
            console.table(Role)
            break; 
        case 'Add new department':
            const NewDepartment = await AddDepartment()
            console.table(NewDepartment)
            break;
        case 'Add new role': 
            const NewRole = await AddRole()
            console.table(NewRole) 
            break; 
        case 'Update an employee role': 
            const UpdateEmployee = await UpdateEmployee()
            console.table(UpdateEmployee) 
            break;
        case 'Add an employee': 
            const NewEmployee = await addEmployees()
            console.table(NewEmployee)
            break;  
        case 'Remove Employee': 
            const DeleteEmployee = await removeEmployee() 
            console.table(DeleteEmployee) 
            break;
        case 'Delete a department': 
            const DeleteDepartment = await RemoveDepartment() 
            console.table(DeleteDepartment)
            break; 
        case 'Delete a Role': 
            const DeleteRole = await RemoveRoles()
            console.table(DeleteRole)
            break;  

        case 'Exit': 
            console.log("Farewell Friend!"); 
        }
}

start();
