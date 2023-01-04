const db = require("./connection"); 

async function viewAllDeparments() { 
   try {
    const department = 
    await db.query('SELECT * FROM department')
        return department
    } catch (err) {
        console.log(err)
    }
} 

module.exports = { viewAllDeparments }