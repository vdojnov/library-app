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
  });
}

