// NPM Install
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Classes for employee
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");


// Read or write files to promisify
// const readFileAsync = util.promisify(fs.readFileSync);
const writeFileAsync = util.promisify(fs.writeFileSync);

// Creates array of teamMembers
let teamMembers = [];
let teamName;

// Team name and Questions for manager
managerQuestions = [
    {
        type: "input",
        message: "Let's start a project. What is the team name?",
        name: "teamname",
    },
    {
        type: "input",
        message: "Who is the Project Manager?",
        name: "managername"
        // validate: validate.name
    },
    {
        type: "input",
        message: "What is the Project Manager's ID number?",
        name: "managerid",
        // validate: validate.int
    },
    {
        type: "input",
        message: "What is the Project Manager's email?",
        name: "manageremail",
        // validate: validate.email
    },
    {
        type: "input",
        message: "What is the Project Manager's office number?",
        name: "officenumber",
    }
];

//// Questions for employees
teamQuestions = [
    {
        type: "list",
        message: "Select type of employee to add:",
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
        message: "What is the employee's ID number?",
        name: "employeeid",
        // validate: validate.int
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "employeeemail",
        // validate: validate.email
    },
    {
        type: "input",
        message: "What is the Engineer's GitHub user name?",
        when: (userResponse) => userResponse.role === "Engineer",
        name: "github",
    },
    {
        type: "input",
        message: "What is the Intern's school name?",
        when: (userResponse) => userResponse.role === "Intern",
        name: "school",
    },
    {
        type: "confirm",
        message: "Would you like to add another employee to the team?",
        name: "additonalmember",
    },
];

function init() {
    inquirer.prompt(managerQuestions)
        .then(managerResponse => {
            teamName = managerResponse.teamname;
            const managerName = managerResponse.managername;
            const managerId = managerResponse.managerid;
            const managerEmail = managerResponse.manageremail;
            const officeNumber = managerResponse.officenumber;

            // Creates and adds ONE manager to teamMember array
            manager = new Manager(managerName, managerId, managerEmail, officeNumber);
            teamData();
        })
}

// Collects role, employee's name, id#, email, github, school
function teamData() {
    inquirer.prompt(teamQuestions)
        .then(userResponse => {
            const role = userResponse.role;
            const employeeName = userResponse.employeename;
            const employeeId = userResponse.employeeid;
            const employeeEmail = userResponse.employeeemail;
            const github = userResponse.github;
            const school = userResponse.school;
            // Asks if you want to add another member (y/n)
            const additonalMember = userResponse.additonalmember;

            // Creates new engineer or intern
            if (role === "Engineer") {
                const engineer = new Engineer(employeeName, employeeId, employeeEmail, github);
                teamMembers.push(engineer);
            } else if (role === "Intern") {
                const intern = new Intern(employeeName, employeeId, employeeEmail, school);
                teamMembers.push(intern);
            }

            // Creates statement that lets the function rerun to include more engineers or interns
            if (additonalMember === true) {
                teamData();
            } else {
                // Makes manager card
                renderManagerCard(manager);

                // Renders engineers and-or intern cards
                for (var i = 0; i < teamMembers.length; i++) {
                    let employee = teamMembers[i];
                    cards += renderEmployeeCard(employee);
                }

                // Places all employees cards into main.html page
                let main = fs.readFileSync("./templates/main.html", "utf8");
                // Dont understand "/{{teamTitle}}/g"
                main = main.replace(/{{teamTitle}}/g, teamName);
                main = main.replace("{{cards}}", cards);

                // Creates new folder and teampage.html
                writeFileAsync("./example/teampage.html", main);
            }
        })
}

// Makes manager card
function renderManagerCard(manager) {
    let managerCard = fs.readFileSync("./templates/manager.html", "utf8");
    managerCard = managerCard.replace("{{name}}", manager.getName());
    managerCard = managerCard.replace("{{role}}", manager.getRole());
    managerCard = managerCard.replace("{{id}}", manager.getId());
    managerCard = managerCard.replace("{{email}}", manager.getEmail());
    managerCard = managerCard.replace("{{officeNumber}}", manager.getOfficeNumber());
    cards = managerCard;
    return cards;
}

// Makes engineer or intern cards
function renderEmployeeCard(employee) {
    if (employee.getRole() === "Engineer") {
        let engineerCard = fs.readFileSync("./templates/engineer.html", "utf8");
        engineerCard = engineerCard.replace("{{name}}", employee.getName());
        engineerCard = engineerCard.replace("{{role}}", employee.getRole());
        engineerCard = engineerCard.replace("{{id}}", employee.getId());
        engineerCard = engineerCard.replace("{{email}}", employee.getEmail());
        engineerCard = engineerCard.replace("{{github}}", employee.getGithub());
        return engineerCard;
    } else if (employee.getRole() === "Intern") {
        let internCard = fs.readFileSync("./templates/intern.html", "utf8");
        internCard = internCard.replace("{{name}}", employee.getName());
        internCard = internCard.replace("{{role}}", employee.getRole());
        internCard = internCard.replace("{{id}}", employee.getId());
        internCard = internCard.replace("{{email}}", employee.getEmail());
        internCard = internCard.replace("{{school}}", employee.getSchool());
        return internCard;
    }
}

// Starts everything with "node app.js" 
init();