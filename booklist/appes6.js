const
    bookTitle = document.querySelector('#title'),
    bookAuthor = document.querySelector('#author'),
    bookIsbn = document.querySelector('#isbn'),
    bookList = document.querySelector('#book-list'),
    bookForm = document.querySelector('#book-form');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class BookHelpers {
    showMessage(errorMessage, className) {
        console.log('showing message ...');
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert ${className}`;
        messageDiv.appendChild(document.createTextNode(errorMessage));

        const container = document.querySelector('.container');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(messageDiv, bookForm);
        setTimeout(this.removeErrorMessage, 3000);
    }

    removeErrorMessage() {
        console.log('removing message ...');
        document.querySelector('.alert').remove();
    }

    clearFields() {
        console.log('clearing fields ...');
        bookTitle.value = '';
        bookAuthor.value = '';
        bookIsbn.value = '';
    }

    addBookToBookList(book) {
        console.log('adding book to book list ...');
        bookList.appendChild(this.createTableRow(book));
        this.clearFields();
    }

    removeBookFromBookList(target) {
        console.log('removing book from book list ...');
        console.log(target.parentElement);
        const isbn = target.parentElement.previousElementSibling.textContent;
        target.parentElement.parentElement.remove();
        Storage.removeBookFromLocalStorage(isbn)
    }

    createElement(elementToCreate) {
        console.log(`creating element "${elementToCreate}" ...`);
        return document.createElement(elementToCreate);
    }

    createTableData(data) {
        console.log(`creating table data "${data}" ...`);
        const tableData = this.createElement('td');
        tableData.innerText = data;
        return tableData;
    }

    createDeleteLink() {
        console.log('creating delete link ...');
        const tableData = this.createElement('td');
        tableData.innerHTML = '<a href="#" class="delete">X</a>';
        return tableData;
    }

    createTableRow(book) {
        console.log(`creating table row for book ..."`);
        const tableRow = this.createElement('tr');
        for(let property in book) {
            if (book.hasOwnProperty(property)) {
                tableRow.appendChild(this.createTableData(book[property]));
            }
        }
        tableRow.appendChild(this.createDeleteLink());
        return tableRow;
    }
}

bookhelpers = new BookHelpers();

class Storage {
    static getBooksFromLocalStorage() {
        let books = JSON.parse(localStorage.getItem('books'));
        if (books === null) {
            books = [];
        }
        return books;
    }

    static addBookToLocalStorage(book) {
        console.log('addBookToLocalStorage');
        let books = this.getBooksFromLocalStorage();
        books.push(book);
        this.saveBooksToLocalStorage(books);
    }

    static removeBookFromLocalStorage(isbn) {
        let books = this.getBooksFromLocalStorage();
        books.forEach(
            function (book, index) {
                if (book.isbn === isbn) {
                    books.splice(index, 1);
                }
            }
        );
        this.saveBooksToLocalStorage(books);
    }

    static saveBooksToLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }
}

function displayBooks() {
    let books = Storage.getBooksFromLocalStorage();
    books.forEach(
        function (book) {
            bookhelpers.addBookToBookList(book);
        }
    )
}

document.addEventListener('DOMContentLoaded', displayBooks);
bookForm.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);

function addBook(event) {
    console.log('adding book ...');
    const
        title = bookTitle.value,
        author = bookAuthor.value,
        isbn = bookIsbn.value;

    if (isDataInvalid(title, author, isbn)) {
        bookhelpers.showMessage('Please fill in all the fields!', 'error');
    } else {
        const book = new Book(title, author, isbn);
        bookhelpers.addBookToBookList(book);
        Storage.addBookToLocalStorage(book);
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