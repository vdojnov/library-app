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
    if (objJson.items) {
        let thumbnail=objJson.items[0].volumeInfo.imageLinks.thumbnail
        return thumbnail;
    } else {
        let thumbnail = "https://lh3.googleusercontent.com/proxy/GURi9BpmMCFCNPQlxa_pbuwhb286-KxvtstO9fyczA-_QyM3vZD3gvq5mfQu2L0-L7hND8JpCyheAQu0qkUsckuxCJ_H1mZ4pZtPZWknyl9Qioi6lnfOHV6tXGvmp52IQV-iKSmluJQtoIk17PylRcAgeJ2Bemx1HJZRYOQbuPVGxgHjk0E";
        return thumbnail;
    }
    // return thumbnail;
}


function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
}

function buildBookDiv(bookObj) {
    bookObj.thumbnail = httpGet(bookObj.title)

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
    imgBookCover.src = bookObj.thumbnail
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

function handleAddBtn() {   
    let form = document.querySelector("#add-book-div"); 
    form.classList.toggle('inactive')
}

function handleSubmitBtn(e) {
    e.preventDefault();
    let inputBookForm = document.querySelector("form")
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let readText = document.querySelector('input[name="read"]:checked').value;
    let readBoolean = readText==="read"
    let category = document.querySelector("#book-category").value
    let newBook = new Book(title, author, readBoolean, category)
    addBookToLibrary(newBook)
    buildBookDiv(newBook)
    inputBookForm.reset();
}


let addBookBtn = document.querySelector("#add-book-btn")
let submitNewBookBtn = document.querySelector("#submit-new-book")






// let bookOne = new Book("The Lean Startup", "Eric Ries", false, "Business")
// addBookToLibrary(bookOne)

// let bookThree = new Book("The Subtle Art of not giving a fuck", "Robert Kiyasaki", false, "Business")
// addBookToLibrary(bookThree)

// let bookTwo = new Book("Rich Dad Poor Dad", "Robert Kiyasaki", false, "Business")
// addBookToLibrary(bookTwo)

// let bookFour = new Book("asdkfasldkj", "Ivo Andric", false, "Business")
// addBookToLibrary(bookFour)

//asign the order to be shown
let outputArr = myLibrary;



outputArr.forEach(bookObj => buildBookDiv(bookObj));

addBookBtn.addEventListener('click', handleAddBtn)

submitNewBookBtn.addEventListener('click', handleSubmitBtn)


// Notes:
// Book API https://www.googleapis.com/books/v1/volumes?q=search+terms