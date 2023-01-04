const db = require("./connection"); 

async function viewAllRoles() { 
   try {
    const Role = 
    await db.query('SELECT * FROM Role')
        return Role
    } catch (err) {
        console.log(err)
    }
} 

module.exports = { viewAllRoles }