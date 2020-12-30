// Functions and Variables
let myLibrary = [];
let bookDiv = document.querySelector('#books-div')
let allDeleteBtns = document.querySelectorAll(".delete-book-btn");

function Book(title, author, read, category, id) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.category = category;
    this.thumbnail = "";
    this.id = id;
    this.info = function() {    
        return title + " by " + author+ ", " + pages +" pages, " + read?"finished reading.":"not yet read."; 
    }    
}

function getBookCoverURL(title, cb) {
    let xmlHttp = new XMLHttpRequest();
    let theUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + title;
    xmlHttp.onload = function (e) {
        let objJson = JSON.parse(xmlHttp.responseText);        
        try {
            let thumbnail=objJson.items[0].volumeInfo.imageLinks.thumbnail;
            cb(thumbnail);
        } catch (error) {
            let thumbnail = "https://vignette.wikia.nocookie.net/halo-university/images/5/5e/Cover_Art_Unavailable.png/revision/latest?cb=20160508020626";
            cb(thumbnail);
        }        
    }
    xmlHttp.open( "GET", theUrl);
    xmlHttp.send();
}


function addBookToLibrary(bookObj) {
    myLibrary.unshift(bookObj)
}

function buildBookDiv(bookObj) {
    getBookCoverURL(bookObj.title, (thumbnail) => {
        bookObj.thumbnail = thumbnail;
        // create book div
        const book = document.createElement('div')
        book.className = "book" 
        book.dataset.id = bookObj.id
    
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
        imgBookCover.src = bookObj.thumbnail[4]==="s"? bookObj.thumbnail: bookObj.thumbnail.slice(0, 4) + "s" + bookObj.thumbnail.slice(4);
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
  
        bookDiv.insertBefore(book, bookDiv.firstChild);
        updateCurrentButtons()
    })
}

function handleAddBtn() {   
    let form = document.querySelector("#add-book-div"); 
    form.classList.toggle('inactive')
}

function handleSubmitBtn() {
    // e.preventDefault();
    let inputBookForm = document.querySelector("form");
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let radioButton = document.querySelector('input[name="read"]:checked');
    if (!radioButton) {return false}
    let readText = radioButton.value;
    let readBoolean = readText==="read";
    let category = document.querySelector("#book-category").value;
    let id = (myLibrary.length === 0)? 0:myLibrary[0].id + 1;
    
    let blank = "";
    if (title===blank | author===blank | category === blank | !radioButton) {
        return false
    }


    let newBook = new Book(title, author, readBoolean, category, id)
    addBookToLibrary(newBook)
    buildBookDiv(newBook)
    inputBookForm.reset();
    handleAddBtn()
}

function updateCurrentButtons() {
    allDeleteBtns = document.querySelectorAll(".delete-book-btn")
    allDeleteBtns.forEach(delBtn => {
        delBtn.addEventListener('click', deleteBook)
        // delBtn.addEventListener("mouseover", () => {console.log("mouse")})
    });
}

function deleteBook() {
    // alert("here")
    let bookID = this.parentElement.dataset.id;
    console.log(bookID)
    myLibrary = myLibrary.filter((book) => {
        return book.id !== bookID
    })
    this.parentElement.classList.toggle('inactive')
}

let addBookBtn = document.querySelector("#add-book-btn")
let submitNewBookBtn = document.querySelector("#submit-new-book")

// let bookOne = new Book("The Lean Startup", "Eric Ries", false, "Business")
// addBookToLibrary(bookOne)

// let bookThree = new Book("The Subtle Art of not giving a fuck", "Robert Kiyasaki", false, "Business")
// addBookToLibrary(bookThree)

// let bookTwo = new Book("Rich Dad Poor Dad", "Robert Kiyasaki", false, "Business")
// addBookToLibrary(bookTwo)



//assign the order to be shown
let outputArr = myLibrary;

outputArr.forEach(bookObj => buildBookDiv(bookObj));

addBookBtn.addEventListener('click', handleAddBtn)

// Array.from(allDeleteBtns)


// allDeleteBtns.forEach(delBtn => {
//     delBtn.addEventListener('click', deleteBook)
//     // delBtn.addEventListener("mouseover", () => {console.log("mouse")})
// });

// console.log(allDeleteBtns)

// Notes:
// Book API https://www.googleapis.com/books/v1/volumes?q=search+terms