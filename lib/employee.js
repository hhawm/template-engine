class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }
    getName() {
        // console.log(`Employee Name: ${this.name}`);
        return this.name;
    }
    getId() {
        // console.log(`Employee ID: ${this.id}`);
        return this.id;
    }
    getEmail() {
        // console.log(`Employee Email: ${this.email}`);
        return this.email;
    }
    getRole() {
        // console.log(`Employee Role: ${this.getRole}`);
        return this.role;
    }
}

module.exports = Employee;

