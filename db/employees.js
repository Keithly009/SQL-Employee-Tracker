const db = require("./connection"); 

async function viewAllEmployees() { 
   try {
    const employee = 
    await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id')
        return employee
    } catch (err) {
        console.log(err)
    }
} 

module.exports = { viewAllEmployees }