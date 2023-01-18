const db = require("./connection"); 

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
     const Role = await viewAllRoles(); 
     const { name, } = await inquirer.prompt([
        {
            type: 'input', 
            Name: 'name', 
            message: 'Please type the name of hte role you would like to add!'
        }
     ])
        await db.query(`INSERT INTO role (name) VALUES ("${name}") `)
        const AddRole = await viewAllRoles(); 
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