$(document).ready(onReady);

//enables the text submit and delete buttons and their functions when the page loads
function onReady() {
  $('.submit').on('click', addEmployee);
  //this uses the .tableSec__table__tbody since there will not be any delete buttons until employees are added
  $('.tableSec__table__tbody').on('click', '#del', deleteItem);
  updateDisp();
}

//this array is to demonstrate functionality. Can be commented out if no longer wanted
let testArr = [
  {firstName: 'Jack', lastName: 'O\'Neil', idNumber: 0001, jobTitle: 'Colonel', annualSalary: 100000},
  {firstName: 'Samantha', lastName: 'Carter', idNumber: 0002, jobTitle: 'Lieutenant', annualSalary:  80000},
  {firstName: 'Daniel', lastName: 'Jackson', idNumber: 0003, jobTitle: 'Archaeologist', annualSalary: 40000},
  //??? did they pay Teal'c? They made him stay on base for the first few seasons
  {firstName: 'Teal\'c', lastName: '', idNumber: 0004, jobTitle: 'First Prime', annualSalary: 0000}
]

//array to add and remove employees from
let employee = [];
let monthlyTot = 0;

//adds test array to employee array if test array is in use
employee = employee.concat(testArr);

function addEmployee() {
  console.log('addEmployee');
  let firstName = $('#in-first-name').val();
  let lastName = $('#in-last-name').val();
  let idNumber = $('#in-id-number').val();
  let jobTitle = $('#in-job-title').val();
  let annualSalary = $('#in-annual-salary').val();
  //this checks if an ID number is entered. ID is a required field. 
  //Displays an alert if none is present and resets input fields
  if (idNumber === undefined || idNumber === '') {
    alert('Must have an id number.')
    return
  }

  //this ensures that the employee ID entered is unique as this will be used to search the array by other functions.
  for (let i = 0; i < employee.length; i++) {
    if (idNumber === employee[i].id) {
      //alert to inform user that ID numbers must be unique
      alert('ID numbers must be unique');
      //clears the input fields
      clear();
      return;
    }
  }

  //adds the new employee to the array
  employee.push({
    firstName: firstName,
    lastName: lastName,
    idNumber: idNumber,
    jobTitle: jobTitle,
    annualSalary: annualSalary
  });
  updateDisp();
  clear();
}

//updates the display after adding or removing an employee
//would eventually like to make it sort by ID numbers but was not necessary to complete the assignments so I focused my efforts elsewhere
function updateDisp() {
  //clears the body of the table to prevent dups
  $('.tableSec__table__tbody').empty();

  //resets the monthly expenses to zero then loops the array to recalculate while also sending employee data to the DOM.
  //I am curious to know if there would be a significant preformance loss by recalculating from zero each time rather than adding or subtracting from the data being added or removed
  monthlyTot = 0;
  for (let i = 0; i < employee.length; i++) {
    $('.tableSec__table__tbody').append(`<tr><td>${employee[i].firstName}</td><td>${employee[i].lastName}</td><td class="id">${employee[i].idNumber}</td><td>${employee[i].jobTitle}</td><td>${currency(employee[i].annualSalary).format()}</td><td><button id="del">Delete</button></td></tr>`);
    monthlyTot += employee[i].annualSalary / 12;
  }
  //colors the monthly expense total red if > 20000
  //resets it to white if amount goes back under 20000
  $('.tableSec__title__total').html(`${currency(monthlyTot).format()}`);
  if (monthlyTot > 20000) {
    $('.tableSec__title__total').css('color', 'red');
  } else {
    $('.tableSec__title__total').css('color', '#fff');
  }
}

//clears the input fields after either collecting data or displaying alert message
function clear() {
  $('#in-first-name').val('');
  $('#in-last-name').val('');
  $('#in-id-number').val('');
  $('#in-job-title').val('');
  $('#in-annual-salary').val('');
}

//removes item from the display
function deleteItem() {
  //delete buttons are not initially available on the DOM
  //this uses the closest tr, which should be the one containing the delete button
  //to find the text in the id column of that row.
  let thisId = $(this).closest('tr').children('td.id').text();
  //this uses findIndex and a function to search the array for an object with the matching value for the id number
  let index = employee.findIndex(number => number.id === thisId);
  //this then removes the objdct at the index of the array found by the previous function
  employee.splice(index, 1);
  //finally this calls the updateDisp() to both reprint the employee data and recalculate and reprint the monthlyExpenses to the DOM
  updateDisp();
}