// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6O5FBhhx1yZem_5Zt3hfM_aoFn-VFtXg",
    authDomain: "library-app-a3653.firebaseapp.com",
    databaseURL: "https://library-app-a3653-default-rtdb.firebaseio.com",
    projectId: "library-app-a3653",
    storageBucket: "library-app-a3653.appspot.com",
    messagingSenderId: "1021284249384",
    appId: "1:1021284249384:web:572c4d9619dd5da7b7aa1d"
  };

firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
let db = firebase.database();

// let ii = firebase.database().ref().child('array')
// ii.on('value', snap => console.log(snap.val()))

function writeBookData(bookID, title, author, read, category, thumbnail) {
  firebase.database().ref('books/' + bookID).set({
    title: title,
    author: author,
    read: read,
    category: category,
    thumbnail: thumbnail,
    id: bookID
  });
}

var ref = firebase.database().ref();
let ir;
function populateMyLibrary() {
  ref.on("value", function(snapshot) {
    try {
      myLibrary = [];
      bookDiv.innerHTML = ""
      for (let key in snapshot.val().books){
        console.log(snapshot.val().books[key])
        addBookToLibrary(snapshot.val().books[key])
        buildBookDiv(snapshot.val().books[key])
      }      
    } catch (error) {
      
    }
    // for (let j = 0; j<len; j++) {
    //   console.log(snapshot.val().books[j])

    //   addBookToLibrary(snapshot.val().books[j])
    //   buildBookDiv(snapshot.val().books[j])
    //   console.log(snapshot.val().books[j])
    // }
    // console.log(snapshot.val().books);
  }, function (error) {
    console.log("Error: " + error.code);
  });
}
  
// let obj = JSON.parse(ir.books)

// console.log(ir)

// console.log(
//   firebase.database().ref('/books/').once('value').then((snapshot) => {
//   var username = (snapshot.val()
// })
// )

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// }); 
