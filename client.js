$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  // A 'Submit' button should collect the form information
  $('.submit').on('click', addEmployee);
}

let employee = [];

function addEmployee() {
  console.log('addEmployee');
  
}


// ARRAY The application should have an input form that collects _employee first name, last name, ID number, job title, annual salary_.

//store the information to calculate monthly costs

//append information to the DOM and clear the input fields


//Using the stored information, calculate monthly costs and append this to the to DOM. 

//If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.

// Create a delete button that removes an employee from the DOM. 

//For Base mode, it does **not** need to remove that Employee's salary from the reported total.

// Once the employee is deleted, update the total spend on salaries account for this employee's removal. This will require that the logic knows which element was removed. You will need to use `.text()` as a getter or look into jQuery's `.data()` function. This is tricky!