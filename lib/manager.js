const Employee = require("./employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = "Project Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return this.role;
    }
}

module.exports = Manager;