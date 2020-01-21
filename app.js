const inquirer = require("inquirer");
const validate = require("./lib/validate");
const out = require("./lib/out");
const report = require("./lib/report");

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");


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