const bookTitle = document.querySelector('#title'),
    bookAuthor = document.querySelector('#author'),
    bookIsbn = document.querySelector('#isbn'),
    bookList = document.querySelector('#book-list');

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function BookHelpers() {
}

bookhelpers = new BookHelpers();

BookHelpers.prototype.showMessage = function (errorMessage, className) {
    console.log('showing error message ...');
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${className}`;
    messageDiv.appendChild(document.createTextNode(errorMessage));

    const container = document.querySelector('.container');
    const bookForm = document.querySelector('#book-form');

    container.insertBefore(messageDiv, bookForm);
    setTimeout(this.removeErrorMessage, 3000);
};

BookHelpers.prototype.removeErrorMessage =  function () {
    console.log('removing error message ...');
    document.querySelector('.alert').remove();
};

BookHelpers.prototype.clearFields = function () {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookIsbn.value = '';
};

BookHelpers.prototype.addBookToBookList = function (book) {
    console.log('adding book to book list ...');
    bookList.appendChild(createTableRow(book));
    this.clearFields();
};

BookHelpers.prototype.removeBookFromBookList = function (target) {
    target.parentElement.parentElement.remove();
};

function createTableRow(book) {
    console.log(`creating table row for book ..."`)
    const tableRow = createElement('tr');
    for(let property in book) {
        if (book.hasOwnProperty(property)) {
            tableRow.appendChild(createTableData(book[property]));
        }
    }
    tableRow.appendChild(createDeleteLink());
    return tableRow;
}

function createElement(elementToCreate) {
    console.log(`creating element "${elementToCreate}" ...`);
    return document.createElement(elementToCreate);
}

function createTableData(data) {
    console.log(`creating table data "${data}" ...`);
    const tableData = createElement('td');
    tableData.innerText = data;
    return tableData;
}

function createDeleteLink() {
    console.log('creating delete link ...');
    const tableData = createElement('td');
    tableData.innerHTML = '<a href="#" class="delete">X</a>';
    return tableData;
}

document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('book-list').addEventListener('mousedown', removeBook);

function addBook(event) {
    console.log('adding book ...');
    const title = bookTitle.value,
        author = bookAuthor.value,
        isbn = bookIsbn.value;

    if (isDataInvalid(title, author, isbn)) {
        bookhelpers.showMessage('Please fill in all the fields!', 'error');
    } else {
        const book = new Book(title, author, isbn);
        bookhelpers.addBookToBookList(book);
        bookhelpers.showMessage('Book added!', 'success');
    }

    event.preventDefault();
}

function isDataInvalid(title, author, isbn) {
    console.log('validating data ...');
    return (
        title === '' || author === '' || isbn === ''
    );

}

function removeBook(event) {
    console.log('removing book ...');
    if (event.target.classList.contains('delete')) {
        bookhelpers.removeBookFromBookList(event.target);
        bookhelpers.showMessage('Book removed!', 'success');
    }
}