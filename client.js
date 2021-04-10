$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  // A 'Submit' button should collect the form information
  $('.submit').on('click', addEmployee);
  $('.tableSec__table__tbody').on('click', '#del', deleteItem);
}

// ARRAY The application should have an input form that collects _employee first name, last name, ID number, job title, annual salary_.
//store the information to calculate monthly costs
let employee = [];
let monthlyTot = 0;

function addEmployee() {
  console.log('addEmployee');
  let firstName = $('#in-first-name').val();
  let lastName = $('#in-last-name').val();
  let idNumber = $('#in-id-number').val();
  let jobTitle = $('#in-job-title').val();
  let annualSalary = $('#in-annual-salary').val();
  // console.log(firstName);
  // console.log(lastName);
  // console.log(idNumber);
  // console.log(jobTitle);
  // console.log(annualSalary);
  if (idNumber === undefined || idNumber === '') {
    alert('Must have an id number.')
    return
  }

  for (let i = 0; i < employee.length; i++) {
    // console.log(i);
    // console.log(employee[i].id);
    if (idNumber === employee[i].id) {
      alert('ID numbers must be unique');
      // console.log('found');
      clear();
      return;
    }
    console.log('not found');
  }

  employee.push({
    firstName: firstName,
    lastName: lastName,
    id: idNumber,
    jobTitle: jobTitle,
    annualSalary: annualSalary
  });
  //console.log(employee);
  updateDisp();
  clear();
}

//append information to the DOM and clear the input fields
//Using the stored information, calculate monthly costs and append this to the to DOM. 
function updateDisp() {
  $('.tableSec__table__tbody').empty();
  monthlyTot = 0;
  for (let i = 0; i < employee.length; i++) {
    $('.tableSec__table__tbody').append(`<tr><td>${employee[i].firstName}</td><td>${employee[i].lastName}</td><td class="id">${employee[i].id}</td><td>${employee[i].jobTitle}</td><td>${employee[i].annualSalary}</td><td><button id="del">Delete</button></td></tr>`);
    monthlyTot += employee[i].annualSalary / 12;
  }
  $('.tableSec__title__total').html(`${monthlyTot}`);
  if (monthlyTot > 20000) {
    $('.tableSec__title__total').css('color', 'red');
  } else {
    $('.tableSec__title__total').css('color', '#fff');

  }
}

{
  /* <th><td>${firstName}</td><td>${lastName}</td><td>${idNumber}</td><td>${jobTitle}</td><td>${annualSalary}</td></th> */
}

function clear() {
  $('#in-first-name').val('');
  $('#in-last-name').val('');
  $('#in-id-number').val('');
  $('#in-job-title').val('');
  $('#in-annual-salary').val('');
}

function deleteItem() {
  console.log('delete');
  let thisId = $(this).closest('tr').children('td.id').text();
  console.log(thisId);
  let index = employee.findIndex(number => number.id === thisId);
  console.log(index);

  console.log(employee);
  employee.splice(index, 1);
  console.log(employee);
  updateDisp();
  

  //let index = employee.id.indexOf(thisId);
  //console.log(index);

  // let hello = [{name: 'John', age: 34}, {name: 'Matt', age: 33}];
  // let i = hello.findIndex(index => index.age === 34);
  // console.log('i:',i);
  

  
  //$(this).closest('tr').children('td.two').text();
}









//If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.

// Create a delete button that removes an employee from the DOM. 

//For Base mode, it does **not** need to remove that Employee's salary from the reported total.

// Once the employee is deleted, update the total spend on salaries account for this employee's removal. This will require that the logic knows which element was removed. You will need to use `.text()` as a getter or look into jQuery's `.data()` function. This is tricky!