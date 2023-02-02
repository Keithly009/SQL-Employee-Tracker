const db = require("./connection"); 
const inquirer = require("inquirer");
async function viewAllDepartments() { 
   try {
    const department = 
    await db.query('SELECT * FROM department')
        return department
    } catch (err) {
        console.log(err)
    }
}
async function AddDepartment(){ 
    try {  
        const { name, } = await inquirer.prompt ([ 
            {
                type: 'input', 
                name: 'name', 
                message: "Type in the name of the department you wish to add!"
            }
        ]) 
            await db.query(`INSERT into department (name) VALUES ("${name}")`)
            const AddDepartment = await viewAllDepartments(); 
            return AddDepartment 
    } catch (err) { 
        console.log(err)
    } 
}

// Make function to delete department 
async function RemoveDepartment(){ 
    try { 
        // Make view department -> then allow a way to select department to delete 
        const ViewDepartment = await viewAllDepartments(); 
        const { id } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'id', 
                message: `Please select a department to remove`,
                choices: ViewDepartment.map((department) => { 
                    return { 
                        name: department.name, 
                        value: department.id
                    }
                }) 
            }
        ]); 
        await db.query(`DELETE FROM department WHERE id = ${id}`); 
        return await viewAllDepartments(); 
    } catch (err) { 
        console.log(err)
    } 
}

module.exports = { viewAllDepartments, AddDepartment, RemoveDepartment }