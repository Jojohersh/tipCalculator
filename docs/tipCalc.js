var totalCash = 0;
var totalHours = 0;

window.onload = (event) => {
  let calcButton = document.getElementById("calcButton");
  calcButton.style.display = "none";

  calcButton.addEventListener("click",()=>{
    displayTipsCalc();
  });

  var employees = [];
  if (checkForEmployees() === true) {
    employees = localStorage.getItem("employees").split(",");
  }

  let totalCashInput = document.getElementById("totalCash");
  totalCashInput.value = 0;
  totalCashInput.addEventListener("change", ()=>{
    var inputValue = parseFloat(totalCashInput.value);
    if (isNaN(inputValue)) {
      alert("Total Cash amount not a number. Please enter a valid value.");
    } else {
      totalCash = inputValue;
    }
  });


  setupAddButton(employees);
  populateEmployeeList(employees);
};

// checks local storage for employees and populates, the page on success

function checkForEmployees() {
  if (localStorage.length === 0) {
    console.log("localStorage currently empty");
    return false;
  } else if (localStorage.length > 0) {
    let employees = localStorage.getItem("employees").split(",");
    console.log(employees);
    if (employees.length && employees.length > 0) {
      return true;
      // populateEmployeeList(employees);
    }
    return false;
  }
}

// takes in array of employees, adds li items of the employees

function populateEmployeeList(employees) {
  let employeeList = document.getElementById("employees");

  for (let i=0;i<employees.length; i++) {
    addEmployee(employees[i], i);
  }
}

function setupAddButton(employees) {
  // let employees = localStorage.getItem("employees").split(",");

  let addButton = document.getElementById("addButton");
  let nameInput = document.getElementById("newName");

  addButton.addEventListener("click", () => {
    let newEmployee = nameInput.value;
    employees.push(newEmployee);
    localStorage.setItem("employees", employees);
    let employeeIndex = employees.length-1;
    addEmployee(newEmployee, employeeIndex);
  });
}

function addEmployee(newEmployee, index) {
  var employees = localStorage.getItem("employees").split(",");

  let employeeList = document.getElementById("employees");

  let liEntry = document.createElement("li");

  let newDiv = document.createElement("div");
  newDiv.classList.add("employee");
  //create a piece of text for employee name
  let nameDiv = document.createElement("div");
  nameDiv.classList.add("name");

  let nameDisplay = document.createTextNode(employees[index]);
  nameDiv.appendChild(nameDisplay);
  newDiv.appendChild(nameDiv);
  //create a text box for employee hours
  let hoursLabel = document.createElement("label");
  hoursLabel.htmlFor = "hoursWorked";
  hoursLabel.innerText = "Hours Worked: ";

  let hoursWorked = document.createElement("input");
  hoursWorked.setAttribute("name", "hoursWorked");
  hoursWorked.setAttribute("type","number");
  hoursWorked.setAttribute("value", "0");
  hoursWorked.classList.add("hoursInput");

  hoursWorked.addEventListener("change", () =>{
    var inputValue = parseFloat(hoursWorked.value);
    if (isNaN(inputValue)) {
      alert("hours worked value is not a number. Please enter a valid value.");
    }
  });

  newDiv.appendChild(hoursLabel);
  newDiv.appendChild(hoursWorked);

  let tipsOwed = document.createElement("b");
  tipsOwed.innerText = "Tips owed: $";

  let tipsOwedAmount = document.createElement("span");
  tipsOwedAmount.classList.add("tips");
  tipsOwedAmount.innerText = 0;
  newDiv.appendChild(tipsOwed);
  newDiv.appendChild(tipsOwedAmount);

  let deleteSpan = document.createElement("span");
  deleteSpan.classList.add("delete");
  let boldDelete = document.createElement("b");
  boldDelete.innerText = "Remove Employee";

  let calcButton = document.getElementById("calcButton");
  if (calcButton.style.display == "none") {
    calcButton.style.display = "block";
  }

  deleteSpan.addEventListener("click", ()=>{
    var parentDiv = deleteSpan.parentElement;
    var currentEmployee = parentDiv.getElementsByClassName("name");
    var currentEmployeeName = currentEmployee[0].innerText;

    employees = localStorage.getItem("employees").split(",");
    var indexOfEmployee = employees.indexOf(currentEmployeeName);

    // console.log(indexOfEmployee);
    if (indexOfEmployee >= 0) {
      employees.splice(indexOfEmployee, 1);
      if (employees.length > 0) {
        localStorage.setItem("employees", employees);
      } else {
        localStorage.removeItem("employees");
        calcButton.style.display = "none";
      }
      var parentLi = parentDiv.parentElement;
      parentLi.remove();
      console.log(employees);
    }
  });

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
    var employeeHours = parseFloat(hoursArray[i].value)
    if (isNaN(employeeHours)) {
      alert("Error calculating total hours. Ensure all employees have hours entered in number format.");
      return;
    }
    totalHours += employeeHours;
  }
}

function displayTipsCalc() {
  totalHoursCalc();
  let hoursArray = document.querySelectorAll("li input");
  let tipsDisplays = document.querySelectorAll("li .tips");

  for (let i=0; i<hoursArray.length; i++) {
    var employeeHours = parseFloat(hoursArray[i].value)
    if (isNaN(employeeHours)) {
      alert("Error calculating total hours. Ensure all employees have hours entered in number format.");
      return;
    }
    tipsDisplays[i].innerText = tipsCalc(employeeHours);
  }
}
