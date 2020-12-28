// Functions and Variables
let myLibrary = [];
let bookDiv = document.querySelector('#books-div')

function Book(title, author, read, category) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.category = category
    this.thumbnail = ""
    this.info = function() {    
        return title + " by " + author+ ", " + pages +" pages, " + read?"finished reading.":"not yet read."; 
    }    
}

const getThumbnail = function(title) {
    const Http = new XMLHttpRequest();
    const url='https://www.googleapis.com/books/v1/volumes?q=' + title;
    Http.open("GET", url);
    Http.send();
    console.log(Http.responseText);
    return Http.responseText;


    // return Http.onreadystatechange = (e) => {
        // console.log("here")
        // console.log(Http.responseText)
        // let objJson = JSON.parse(Http.responseText);
        // console.log(objJson.items[0].volumeInfo.imageLinks.thumbnail)
        // let thumbnail=objJson.items[0].volumeInfo.imageLinks.thumbnail
        // console.log(thumbnail)
        // return thumbnail
    // }
}

function httpGet(title) {
    let xmlHttp = new XMLHttpRequest();
    let theUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + title;
    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
    xmlHttp.send();
    let objJson = JSON.parse(xmlHttp.responseText);
    let thumbnail=objJson.items[0].volumeInfo.imageLinks.thumbnail
    return thumbnail;
}


function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
}

function buildBookDiv(bookObj) {
    // create book div
    const book = document.createElement('div')
    book.className = "book" 

    // Create Book title p tag
    const pBookTitle = document.createElement('p')
    pBookTitle.className = "book-title"
    pBookTitle.textContent = bookObj.title
    book.appendChild(pBookTitle)

    // Create Book author p tag
    const pBookAuthor = document.createElement('p')
    pBookAuthor.className = "book-author"
    pBookAuthor.textContent = bookObj.author
    book.appendChild(pBookAuthor)

    // Create book cover img tag
    const imgBookCover = document.createElement('img')
    imgBookCover.className = "book-img"
    imgBookCover.src = httpGet(bookObj.title)
    book.appendChild(imgBookCover)

    // Create div for toggle read 
    const bookReadDiv = document.createElement('div')
    bookReadDiv.className = "book-read-div"
    
        const pReadText = document.createElement('p')
        pReadText.className = "read-text"
        pReadText.textContent = bookObj.read? "Read":"Not Read";
        bookReadDiv.appendChild(pReadText)

        const readBtn = document.createElement('button')
        readBtn.className = "read-btn"
        readBtn.textContent = bookObj.read? "Mark as Unread":"Mark as Read";
        bookReadDiv.appendChild(readBtn)

    book.appendChild(bookReadDiv)

    // Create delete button for book
    const deleteBtn = document.createElement('button')
    deleteBtn.className = "delete-book-btn"
    deleteBtn.textContent = "Delete"
    book.appendChild(deleteBtn)

    bookDiv.appendChild(book)
}





let bookOne = new Book("The Lean Startup", "Eric Ries", false, "Business")
addBookToLibrary(bookOne)

let bookThree = new Book("The Subtle Art of not giving a fuck", "Robert Kiyasaki", false, "Business")
addBookToLibrary(bookThree)

let bookTwo = new Book("Rich Dad Poor Dad", "Robert Kiyasaki", false, "Business")
addBookToLibrary(bookTwo)

myLibrary.forEach(bookObj => buildBookDiv(bookObj));
// buildBookDiv(bookOne)



// Notes:
// Book API https://www.googleapis.com/books/v1/volumes?q=search+terms