// NPM Install
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Classes for employee
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Read or write files to promisify
const writeFileAsync = util.promisify(fs.writeFileSync);
const readFileAsync = util.promisify(fs.readFileSync);

const employeePrompt = [
    {
        type: "list",
        message: "Select an employee type",
        name: "role",
        choices: ["Engineer", "Intern"]
    },
    {
        type: "input",
        message: "Employee Name",
        name: "name",
        validate: validate.name
    },
    {
        type: "input",
        message: "Employee ID",
        name: "id",
        validate: validate.int
    },
    {
        type: "input",
        message: "Employee Email",
        name: "email",
        validate: validate.email
    }
];