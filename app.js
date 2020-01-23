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
managerQuestions = [
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
        message: "Would you like to add another employee to the team?",
        name: "additonalmember"
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

            //create a new manager and add them to teamMember array
            manager = new Manager(managerName, managerId, managerEmail, officeNumber);
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
                //render manager
                renderManagerCard(manager);

                //render team
                for (var i = 0; i < teamMembers.length; i++) {
                    let employee = teamMembers[i];
                    cards += renderEmployeeCard(employee);
                }

                //read main html and place employee cards into main html
                let main = fs.readFileSync("./templates/main.html", "utf8");
                main = main.replace(/{{teamTitle}}/g, teamName);
                main = main.replace("{{cards}}", cards);

                //Write new html and create path to example folder
                writeFileAsync("./example/teampage.html", main);
            }
        })
}

//=========================
//functions to render data
//========================

//render manager card
function renderManagerCard(manager) {
    let managerCard = fs.readFileSync("./templates/manager.html", "utf8");
    managerCard = managerCard.replace("{{name}}", manager.getName());
    managerCard = managerCard.replace("{{role}}", manager.getRole());
    managerCard = managerCard.replace("{{id}}", manager.getId());
    managerCard = managerCard.replace("{{email}}", manager.getEmail());
    managerCard = managerCard.replace("{{officeNumber}}", manager.getOfficeNumber());
    cards = managerCard;
    return cards
}

//render employee cards
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

init();