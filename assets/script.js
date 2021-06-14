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


function showBooks() {
  container.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    const content = document.createElement('div');
    content.setAttribute('id', i);
    const text = document.createElement('p');
    text.textContent = library[i].info();

    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.textContent = 'Remove';

    const changeReadBtn = document.createElement('button');
    changeReadBtn.addEventListener('click', changeRead);
    changeReadBtn.textContent = 'Readed?';

    content.appendChild(text);
    content.appendChild(changeReadBtn);
    content.appendChild(removeBtn);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, pages.value, read.checked);

  library.push(newBook);

  saveLibrary();
  showBooks();
}

function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}

function loadLibrary() {
  const books = JSON.parse(localStorage.lib);
  for (let i = 0; i < books.length; i += 1) {
    Object.setPrototypeOf(books[i], Book.prototype);
  }
  return books;
}

if (localStorage.lib) {
  library = loadLibrary();
  showBooks();
}

button.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', showForm);
