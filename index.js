const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
// const db = require('./db');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_tracker'
})

connection.connect(function (err) {
  if (err) throw err;
  init();
});

function init() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees",
          "View All Employees By Roles",
          "View all Employees By Departments",
          "Update Employee",
          "Add Employee",
          "Remove Employee",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department"
        ]
      }, ]).then((result) => {
        // creates cases and execuses funtion based on user choice
        switch (result.choice) {
          case "View All Employees":
            viewAllEmployees();
            break;
    
          case "View All Employees By Roles":
            viewAllEmployeesByRoles();
            break;
    
          case "View all Employees By Departments":
            viewAllEmployeesByDepartments();
            break;
    
          case "Update Employee":
            updateEmployee();
            break;
    
          case "Add Employee":
            addEmployee();
            break;
    
          case "Remove Employee":
            deleteEmployee();
            break;
    
          case "Add Role":
            addRole();
            break;
    
          case "Remove Role":
            deleteRole();
            break;
    
          case "Add Department":
            addDepartment();
            break;
    
          case "View All Departments":
            viewAllDepartments();
            break;
    
          case "Remove Department":
            deleteDepartment();
            break;
    
          case "Back to Start":
            startScreen();
            break;
        }
      });
};

// view all employees
function viewAllEmployees() {
    connection.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};
// view all employee's by role
function viewAllEmployeesByRoles() {
    connection.query(`SELECT title, id, salary, department_id FROM role`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init()
    })
};
// view all employees by department
function viewAllEmployeesByDepartments() {
    connection.query(`SELECT id, name FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// update employee
function updateEmployee() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter employee id',
        name: 'updateEmployee'
    },
      {
        type: 'number',
        message: 'Please add a new Role ID',
        name: 'updateRole'
    },
    ]).then((result) => {
      connection.query(`UPDATE employee SET role_id=? WHERE id=?;`,
      [result.updateRole, result.EmployeeUpdate],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
      })
    })
}

// add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: "Please enter the employee's first name",
      name: 'firstName',
      validate: firstName => {
        if(firstName) {
          return true;
        } else {
          console.log("Please enter the employee's fist name");
          return false;
        }
      }
    },
    {
      type: 'input',
      message: "Please enter the employee's last name",
      name: 'lastName',
      validate: lastName => {
        if(lastName) {
          return true;
        } else {
          console.log("Please enter the employee's last name")
          return false;
        }
      }
    },
    {
      type: "number",
      message: "What is the employee's id number?",
      name: "idInput",
    },
    {
      type: "number",
      message: "What is the employee's manager id number?",
      name: "managerId",
    },
  ]).then((input) => {
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
    [
      input.firstName,
      input.lastName,
      input.idInput,
      input.managerId
    ],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
    );
  });
};

// add a role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the name of the role',
      name: 'roleName',
      validate: roleName => {
        if (roleName) {
          return true;
        } else {
          console.log('Enter a name for the role');
          return false;
        }
      }
    },
    {
      type: 'input',
      message: 'Please enter a salary for the role',
      name: 'salaryInput'
    },
    {
      type: 'input',
      message: 'Please enter the department id number',
      name: 'idInput'
    }
  ]).then((input) => {
    connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,
    [input.roleName, input.salaryInput, input.idInput],
    (err, res) => {
      if (err) throw err;
      init();
    }
    )
  });
};

// add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the name of department',
      name: 'nameInput',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a department name');
          return false;
        }
      }
    }
  ]).then((input) => {
    connection.query(`INSERT INTO department (name) VALUES (?);`,
    [input.nameInput],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    })
  });
};

// delete an employee
function deleteEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the first name of the employee you want to delete?',
      name: "firstName"
    },
    {
      type: 'input',
      message: 'What is the last name of the employee you want to delete?',
      name: "lastName"
    }
  ]).then((input) => {
    connection.query(`DELETE FROM employee WHERE first_name=? AND last_name=?;`,
    [input.firstName, input.lastName],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    })
  });
};

// delete a department
function deleteDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Which department would you want to delete?',
      name: "deleteInput"
    },
  ]).then((input) => {
    connection.query(`DELETE FROM department WHERE name=?;`,
    [input.deleteInput],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    })
  });
};

// views all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

// deletes a role
function deleteRole() {
  inquirer.prompt([{
    type: "input",
    message: "Which Role do you want to delete?",
    name: "deleteInput",
  }, ]).then((input) => {
    connection.query("DELETE FROM role WHERE title= ?;", [input.deleteInput], (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    })
  });
};
