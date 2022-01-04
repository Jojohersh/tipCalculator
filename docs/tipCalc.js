var totalCash = 0;
var totalHours = 0;

window.onload = (event) => {
  // localStorage.setItem("employees",["Jordan", "Coye", "Andi"])
  setupAdd();
  checkForEmployees();
};

// checks local storage for employees and populates, the page on success

function checkForEmployees() {
  if (localStorage.length === 0) {
    console.log("localStorage currently empty");
  } else if (localStorage.length > 0) {
    let employees = localStorage.getItem("employees").split(",");
    console.log(employees);
    if (employees.length && employees.length > 0) {
      populateEmployeeList(employees);
    }
  }
}

// takes in array of employees, adds li items of the employees

function populateEmployeeList(employees) {
  let employeeList = document.getElementById("employees");

  for (let i=0;i<employees.length; i++) {
    addEmployee(employees[i], i);
  }
}

function setupAdd() {
  let employees = localStorage.getItem("employees").split(",");

  let addSection = document.getElementById("addSection");
  let add = document.getElementById("add");

  let newEmployeeDiv = document.createElement("div");
  newEmployeeDiv.id = "newEmployee";
  let nameInput = document.createElement("input");
  nameInput.classList.add("name");
  nameInput.setAttribute("name","name");
  let nameLabel = document.createElement("label");
  nameLabel.htmlFor = "name";
  nameLabel.innerText = "Employee name:";

  let addButton = document.createElement("button");
  addButton.innerText = "Add";
  addButton.addEventListener("click", () => {
    let newEmployee = nameInput.value;
    employees.push(newEmployee);
    localStorage.setItem("employees", employees);
    let employeeIndex = employees.length-1;
    addEmployee(newEmployee, employeeIndex);
  });

  newEmployeeDiv.appendChild(nameLabel);
  newEmployeeDiv.appendChild(nameInput);
  newEmployeeDiv.appendChild(addButton);

  addSection.appendChild(newEmployeeDiv);

}

function addEmployee(newEmployee, index) {
  let employees = localStorage.getItem("employees").split(",");

  let employeeList = document.getElementById("employees");

  let liEntry = document.createElement("li");

  let newDiv = document.createElement("div");
  newDiv.classList.add("employee");
  //create a piece of text for employee name
  let nameDiv = document.createElement("div");
  nameDiv.classList.add("name");
  nameDiv.id = "name" + index;

  let nameDisplay = document.createTextNode(employees[index]);
  nameDiv.appendChild(nameDisplay);
  newDiv.appendChild(nameDiv);
  //create a text box for employee hours
  let hoursLabel = document.createElement("label");
  hoursLabel.htmlFor = "hoursWorked";
  hoursLabel.innerText = "Hours Worked: ";

  let hoursWorked = document.createElement("input");
  hoursWorked.setAttribute("name", "hoursWorked");
  newDiv.appendChild(hoursLabel);
  newDiv.appendChild(hoursWorked);

  let tipsOwed = document.createElement("b");
  tipsOwed.innerText = "Tips owed: $";
  newDiv.appendChild(tipsOwed);

  let deleteSpan = document.createElement("span");
  deleteSpan.classList.add("delete");
  let boldDelete = document.createElement("b");
  boldDelete.innerText = "X";

  deleteSpan.appendChild(boldDelete);
  newDiv.appendChild(deleteSpan);

  liEntry.append(newDiv);
  employeeList.append(liEntry);
}

function tipsCalc(hours) {
  return Math.floor(totalCash * hours / totalHours);
}

function totalHoursCalc() {
  let hoursArray = document.querySelectorAll("li input");
  totalHours = 0;
  for (let i=0; i<hoursArray.length; i++) {
    totalHours += parseFloat(hoursArray[i].value);
  }
  console.log(totalHours);
}
