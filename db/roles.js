const db = require("./connection"); 
const inquirer = require("inquirer");

async function viewAllRoles() { 
   try {
    const Role = 
    await db.query('SELECT * FROM role')
        return Role
    } catch (err) {
        console.log(err)
    }
} 
async function AddRole() { 
    try {
     const { name, info } = await inquirer.prompt([
        {
            type: 'input', 
            Name: 'name', 
            message: 'Please type the name of the role you would like to add!'
        }, 
        {
            type: 'input', 
            name: 'info',
            message: 'Please insert any information necessary for the role!' 
        }
     ]);
        await db.query(`INSERT INTO role (name) VALUES ("${name}", "${info}") `)
        const role = await viewAllRoles(); 
         return role
     } catch (err) {
         console.log(err)
     }
 } 

 
 async function RemoveRoles() { 
    try {
    const Role = await viewAllRoles();
    const { rRole } = await inquirer.prompt([ 
        {
        type: 'list', 
        name: 'rRole',
        message: 'Please select the role that you would like to remove',
        choices: Role.map((role)=> {
            return { 
                name: role.name, 
                value: role.id
            }
        })
        }
    ])
    await db.query(`DELETE FROM role WHERE id = ${rRole} `)
         return viewAllRoles();
     } catch (err) {
         console.log(err)
     }
 } 
module.exports = { viewAllRoles, AddRole, RemoveRoles }