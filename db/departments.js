const db = require("./connection"); 

async function viewAllDeparments() { 
   try {
    const departments = 
    db.query('SELECT * FROM department').promise()

    return departments
    } catch (err) {
        console.log(err)
    }
} 

module.exports = { viewAllDeparments }