'use strict';
let arrOfBook = [];
let total = 0;

function Book(bookName, bookPrice) {
  this.bookName = bookName;
  this.bookPrice = bookPrice;
  this.bookPages = randomPageGenerator;
  arrOfBook.push(this);
}
function randomPageGenerator() {
  return Math.floor(Math.random() * ((400 - 50 + 1) + 50));
}

let tableElement = document.getElementById('forTable');
let table = document.createElement('table');
tableElement.appendChild(table);
let totalEl = document.createElement('h2');
table.appendChild('totalEl');

function headerTable(){
  let headerArr=['Donor Name','Donor Age','Amount'];
  let headerRow=document.createElement('tr');
  table.appendChild(headerRow);
  for(let i=0;i<headerArr.length;i++){
    let headEl=document.createElement('th');
    headerRow.appendChild(headEl);
    headEl.textContent=`${headerArr[i]}`;
  }
}
headerTable();

Book.prototype.render = function () {
  let rowEl = document.createElement('tr');
  table.appendChild(rowEl);

  let bookEl=document.createElement('td');
    rowEl.appendChild(bookEl);
    bookEl.textContent=this.bookName;

  let pageEl = document.createElement('td');
  rowEl.appendChild(bookEl);
  pageEl.textContent = this.bookPages;

  let priceEl = document.createElement('td');
  rowEl.appendChild(priceEl);
  priceEl.textContent = this.bookName(this.bookPrice);
  totalEl.textContent = `Total= ${calcTotal}`;

  saveToLs();
};



function calcTotal() {
  total = 0;
  for (let i = 0; i < arrOfBook.length; i++) {
    total += parseInt(arrOfBook[i].bookPages);

  }
  return total;
}

let form = document.getElementById('forForm');
form.addEventListener('submit', showToTable);
function showToTable(event) {
  event.preventDefult();
  let bookName = event.target.bookName.value;
  let bookPrice = event.target.bookprice.value;
  let bookPages = '';
  let appendToTable = new Book(bookName, bookPrice, bookPages);
  appendToTable.randomPageGenerator();
  appendToTable.render();
}

function saveToLs() {

  let storage = JSON.stringify(arrOfBook);
  localStorage.setItem('booksInfo', storage);
}

function getFromLS() {

  let oldData = localStorage.getItem('booksInfo');
  let order = JSON.parse(oldData);
  if (order !== null) {
    for (let i = 0; i < order.length; i++) {
      let reInstatiation = new Book(order[i].bookName, order[i].bookPrice, order[i].bookPages);
      reInstatiation.render();

    }
  }
}
getFromLS();
