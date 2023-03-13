const db = require("./connection"); 
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() { 
   try {
    const employee = 
    await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id')
        return employee
    } catch (err) {
        console.log(err)
    }
} 

async function addEmployees(){ 
    try { 
        const viewRoles = await viewAllRoles(); 
        const employees = await viewAllEmployees();
        const {  firstName, lastName, Role, Manager } = 
        await inquirer.prompt([ 
            {
                type: 'input', 
                name: 'firstName', 
                Message: 'Please enter their First name'
            }, 
            {
                type: 'input', 
                name: 'lastName', 
                Message: 'Please enter their last name'
            },
            {
                type: 'list', 
                name: 'Role', 
                Message: 'What is their role?',
                choices: viewRoles.map(Role => { 
                    return { 
                        value: Role.id, 
                        name: Role.title
                    };
                }),
            },
            {
                type: 'list', 
                name: 'Manager', 
                message: 'Who is the manager for this employee?', 
                choices: [ 
                    ...employees.map((em) => { 
                        return { 
                            value: em.id, 
                            name: `${em.first_name} ${em.last_name}`
                        };
                    }),
                ]
            }
        ])
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) `, [firstName, lastName, Role, Manager])
        return viewAllEmployees()
    } catch (err) {
        console.log(err);
    }
}



async function removeEmployee(){ 
    try { 
        // Make view employee -> then allow a way to select employee to delete 
        const RemoveEmployee = await viewAllEmployees(); 
        const { id } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'id', 
                message: `Please select an Employee to remove`,
                choices: RemoveEmployee.map((employee) => { 
                    return { 
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`, 
                        
                    }
                }) 
            }
        ]); 
        console.log(id)
        await db.query(`DELETE FROM employee WHERE id = ?`, [id]); 
        return viewAllEmployees(); 
    } catch (err) { 
        console.log(err)
    } 
}

async function UpdateEmployee() { 
    try { 
        const ShowEmployee = await viewAllEmployees(); 
        const upRole = await viewAllRoles(); 
        const { UpEmployee, UpRole } = await inquirer.prompt([
            { 
                type: 'list', 
                name: 'UpEmployee', 
                question: 'Please select an Employee to update!', 
                choices: ShowEmployee.map((employee)=> { 
                    return {
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`, 
                    };
                }),
            },
            {
                type: 'list', 
                name: 'UpRole', 
                question: 'Please select an Employees Role to Update', 
                choices: upRole.map((role) => { 
                    return { 
                        name: role.title,
                        value: role.id 
                    };
                }),
            },
        ]);
        await db.query( 
            `UPDATE employee SET role_id = ${UpRole} WHERE id = ${UpEmployee}`
        );
        
        const UpdateEmployee = await viewAllEmployees(); 
        return await UpdateEmployee;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, removeEmployee, addEmployees, UpdateEmployee }