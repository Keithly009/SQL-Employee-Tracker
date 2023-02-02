const db = require("./connection"); 
const inquirer = require("inquirer");
const { ViewAllDepartment } = require("./departments");

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
     const ViewDepartment = await ViewAllDepartment();
     const { name, info, dept } = await inquirer.prompt([
        {
            type: 'input', 
            Name: 'name', 
            message: 'Please type the name of the role you would like to add!'
        }, 
        {
            type: 'input', 
            name: 'info',
            message: 'Please insert any information necessary for the role!' 
        }, 
        { 
            type: 'list', 
            name: 'dept', 
            messasge: "Please place the role in the appropriate department", 
            choices: ViewDepartment.map(dept => { 
                return { 
                    value: dept.id,
                    name: dept.name
                }
            })
        }
     ])
        await db.query(`INSERT INTO role (name) VALUES ("${name}", "${info}", "${dept}",) `)
        const Role = await viewAllRoles(); 
         return Role
     } catch (err) {
         console.log(err)
     }
 } 
 async function RemoveRoles() { 
    try {
     const Role = 
     await db.query('SELECT * FROM role')
         return Role
     } catch (err) {
         console.log(err)
     }
 } 
module.exports = { viewAllRoles, AddRole, RemoveRoles }