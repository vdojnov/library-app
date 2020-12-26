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
    this.getThumbnail = function() {
        const Http = new XMLHttpRequest();
        const url='https://www.googleapis.com/books/v1/volumes?q=' + "Think and Grow Rich";
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            // console.log(Http.responseText)
            let objJson = JSON.parse(Http.responseText);
            // console.log(objJson.items[0].volumeInfo.imageLinks.thumbnail)
            this.thumbnail=objJson.items[0].volumeInfo.imageLinks.thumbnail
        
        }
    }
}

function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
}






// Notes:
// Book API https://www.googleapis.com/books/v1/volumes?q=search+terms