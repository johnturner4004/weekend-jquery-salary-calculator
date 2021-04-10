$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  $('.submit').on('click', addEmployee);
  $('.tableSec__table__tbody').on('click', '#del', deleteItem);
  updateDisp();
}

let testArr = [
  {firstName: 'Jack', lastName: 'O\'Neil', idNumber: 0001, jobTitle: 'Colonel', annualSalary: 100000},
  {firstName: 'Samantha', lastName: 'Carter', idNumber: 0002, jobTitle: 'Lieutenant', annualSalary:  80000},
  {firstName: 'Daniel', lastName: 'Jackson', idNumber: 0003, jobTitle: 'Archaeologist', annualSalary: 40000},
  {firstName: 'Teal\'c', lastName: '', idNumber: 0004, jobTitle: 'First Prime', annualSalary: 0000}
]

let employee = [];
let monthlyTot = 0;

employee = employee.concat(testArr);

function addEmployee() {
  console.log('addEmployee');
  let firstName = $('#in-first-name').val();
  let lastName = $('#in-last-name').val();
  let idNumber = $('#in-id-number').val();
  let jobTitle = $('#in-job-title').val();
  let annualSalary = $('#in-annual-salary').val();
  if (idNumber === undefined || idNumber === '') {
    alert('Must have an id number.')
    return
  }

  for (let i = 0; i < employee.length; i++) {
    if (idNumber === employee[i].id) {
      alert('ID numbers must be unique');
      clear();
      return;
    }
    console.log('not found');
  }

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

function updateDisp() {
  $('.tableSec__table__tbody').empty();
  monthlyTot = 0;
  for (let i = 0; i < employee.length; i++) {
    $('.tableSec__table__tbody').append(`<tr><td>${employee[i].firstName}</td><td>${employee[i].lastName}</td><td class="id">${employee[i].idNumber}</td><td>${employee[i].jobTitle}</td><td>${currency(employee[i].annualSalary).format()}</td><td><button id="del">Delete</button></td></tr>`);
    monthlyTot += employee[i].annualSalary / 12;
  }
  $('.tableSec__title__total').html(`${currency(monthlyTot).format()}`);
  if (monthlyTot > 20000) {
    $('.tableSec__title__total').css('color', 'red');
  } else {
    $('.tableSec__title__total').css('color', '#fff');
  }
}

function clear() {
  $('#in-first-name').val('');
  $('#in-last-name').val('');
  $('#in-id-number').val('');
  $('#in-job-title').val('');
  $('#in-annual-salary').val('');
}

function deleteItem() {
  let thisId = $(this).closest('tr').children('td.id').text();
  let index = employee.findIndex(number => number.id === thisId);
  employee.splice(index, 1);
  updateDisp();
}