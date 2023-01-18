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
        const department = await viewAllDepartments(); 
        const { name, } = await inquirer.prompt ([ 
            {
                type: 'input', 
                name: 'title', 
                message: "Type in the name of the department you wish to add!"
            }
        ]) 
            await db.query(`INSERT INTO department (name) VALUES ("${name}")`)
            const Newdepartment = await viewAllDepartments(); 
            return Newdepartment 
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
                message: `Please select a department to remove`,
                name: 'dept', 
                choices: viewAllDepartments.map((department) => { 
                    return { 
                        name: department.name, 
                        value: department.id
                    }
                }) 
            }
        ]); 
        await db.query(`REMOVE FROM department WHERE id = ${dept}`); 
        return await viewAllDepartments(); 
    } catch (err) { 
        console.log(err)
    } 
}

module.exports = { viewAllDepartments, AddDepartment, RemoveDepartment }