// NPM Install
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Classes for employee
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Read or write files to promisify
const readFileAsync = util.promisify(fs.readFileSync);
const writeFileAsync = util.promisify(fs.writeFileSync);

// Creates array of teamMembers
let teamMembers = [];
let teamName;

// Team name and Questions for manager
managerPrompt = [
    {
        type: "input",
        message: "Let's start a project. What is the team name?",
        name: "teamname",
    },
    {
        type: "input",
        message: "Who is the Manager of this project",
        name: "managername"
        // validate: validate.name
    },
    {
        type: "input",
        message: "What is the Manager's ID?",
        name: "managerid",
        // validate: validate.int
    },
    {
        type: "input",
        message: "What is the Manager's Email?",
        name: "manageremail",
        // validate: validate.email
    },
    {
        type: "input",
        message: "What is the Manager's Office Number?",
        name: "officenumber",
        // validate: validate.int
    }
];

//// Questions for employees
teamQuestions = [
    {
        type: "list",
        message: "Select type of employee to add",
        choices: ["Intern", "Engineer"],
        name: "role",
    },
    {
        type: "input",
        message: "What is the employee's name?",
        name: "employeename",
        // validate: validate.name
    },
    {
        type: "input",
        message: "What is the employee's ID?",
        name: "employeeid",
        // validate: validate.int
    },
    {
        type: "input",
        message: "What is the employee's Email?",
        name: "employeeemail",
        // validate: validate.email
    },
    {
        type: "input",
        message: "Engineer's GitHub user name?",
        when: (userResponse) => userResponse.role === "Engineer",
        name: "github",
    },
    {
        type: "input",
        message: "Intern's school name?",
        when: (userResponse) => userResponse.role === "Intern",
        name: "school",
    },
    {
        type: "confirm",
        message: "Would you like to add another employee to the team: " + teamname + "?",
        name: "additonalmember"
    },
];



//functions to help the async init

function managerData() {
    inquirer.prompt(managerQuestions)
        .then(managerResponse => {
            teamName = managerResponse.teamname;
            const managerName = managerResponse.managername;
            const managerId = managerResponse.managerid;
            const managerEmail = managerResponse.manageremail;
            const officeNumber = managerResponse.officeNumber;

            //create a new manager and add them to teamMember array
            const manager = new Manager(managerName, managerId, managerEmail, officeNumber);
            teamMembers.push(manager);
            teamData();
        })
}

function teamData() {
    inquirer.prompt(teamQuestions)
        .then(userResponse => {
            const role = userResponse.role;
            const employeeName = userResponse.employeename;
            const employeeId = userResponse.employeeid;
            const employeeEmail = userResponse.employeeemail;
            const github = userResponse.github;
            const school = userResponse.school;
            const additonalMember = userResponse.additonalmember;

            //create either new engineer or intern
            if (role === "Engineer") {
                const engineer = new Engineer(employeeName, employeeId, employeeEmail, github);
                teamMembers.push(engineer);
            } else if (role === "Intern") {
                const intern = new Intern(employeeName, employeeId, employeeEmail, school);
                teamMembers.push(intern);
            }

            //create a statment that lets the function run for as many members the team needs
            if (additonalMember === true) {
                teamData();
            } else {
                //render the team

                // console.log(teamName);
                // console.log(teamMembers);
            }
        })
}

console.log(teamMembers);


managerData();