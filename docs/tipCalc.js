let metaInfo = {
  totalCash: 0,
  employees: [],
  hours: [],
  cut: []
}

window.onload = (event) => {
  localStorage.setItem("employees",["Jordan", "Coye", "Andi"])
  checkForEmployees();
};

// checks local storage for employees and populates, the page on success

function checkForEmployees() {
  if (localStorage.length === 0) {
    console.log("localStorage currently empty");
  } else if (localStorage.length > 0) {
    let employees = localStorage.getItem("employees").split(",");
    if (employees.length && employees.length > 0) {
      metaInfo.employees = employees;
      populateEmployeeList(employees);
    }
  }
}

// takes in array of employees, adds li items of the employees

function populateEmployeeList(employees) {
  let employeeList = document.getElementById("employees");
  for (let i=0;i<employees.length; i++) {
    //create a container to store employee components
    let liEntry = document.createElement("li");

    let newDiv = document.createElement("div");
    newDiv.classList.add("employee");
    //create a piece of text for employee name
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.id = "name" + i;

    let nameDisplay = document.createTextNode(employees[i]);
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
    tipsOwed.innerText = "$";
    newDiv.appendChild(tipsOwed);

    liEntry.append(newDiv);
    employeeList.append(liEntry);
  }
}
