let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const button = document.querySelector('#btn');
const read = document.querySelector('#read');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const alreadyRead = (this.read) ? 'already read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${alreadyRead}`;
};

function saveLibrary() {
  localStorage.lib = JSON.stringify(library);
}

function removeBook() {
  const { id } = this.parentNode;
  library.splice(id, 1);
  saveLibrary();
  showBooks(); // eslint-disable-line
}

function changeRead() {
  const { id } = this.parentNode;
  const para = this.parentNode.querySelector('p');
  library[id].read = !library[id].read;
  para.innerHTML = library[id].info();
  saveLibrary();
}
