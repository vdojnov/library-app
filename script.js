// Functions and Variables
let myLibrary = [];

function Book(title, author, pages, read, category) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this,category
    this.info = function() {    
        return title + " by " + author+ ", " + pages +" pages, " + read?"finished reading.":"not yet read."; 
    }
}

function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
}






// Notes:
// Book API https://www.googleapis.com/books/v1/volumes?q=search+terms