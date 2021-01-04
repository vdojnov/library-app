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

var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

let currentUser = firebase.auth().currentUser;

// auth.onAuthStateChanged(user =>{
//   // console.log("hereeerrr")
//     let logInOutBtn = document.querySelector('#right-nav a')
//     if (user) {
//       logInOutBtn.onClick = signOut()
//       logInOutBtn.textContent = "LogOut"
//       // alert("hello")
//     } else {
//       logInOutBtn.onClick = signIn()
//       logInOutBtn.textContent = "LogIn"
//       // alert("no user")
//     }
// })
let logInOutBtn = document.querySelector('#right-nav a')

firebase.auth().onAuthStateChanged(function(user) {
  let welcomeDiv = document.querySelector('#welcome-div p')
  if (user) {
    // User is signed in.
    welcomeDiv.textContent =  "Welcome to " + user.displayName + "'s Library"
    logInOutBtn.onclick = signOut
    logInOutBtn.textContent = "LogOut"

  } else {
    // No user is signed in.
    welcomeDiv.textContent = "You are not signed in. To try the app, press the '+' button below or Login first to save your books."
    logInOutBtn.onclick = signIn
    logInOutBtn.textContent = "LogIn"
  }
});



function writeBookData(bookID, title, author, read, category, thumbnail) {
  let userID = auth.currentUser.uid;
  firebase.database().ref('users/' + userID + '/books/' + bookID).set({
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
  // let userID = auth.currentUser.uid;
  ref.on("value", function(snapshot) {
    try {
      myLibrary = [];
      bookDiv.innerHTML = ""
      // console.log(snapshot.val().users[auth.currentUser.uid]['books'][0])
      // if (snapshot.val()!==null){
      //   for (let key in snapshot.val().books){
      //     // console.log(snapshot.val().users)
      //     addBookToLibrary(snapshot.val().books[key])
      //     buildBookDiv(snapshot.val().books[key])
      //   }      
      // }
      if (snapshot.val()!==null){
        for (let key in snapshot.val().users[auth.currentUser.uid]['books']){
          addBookToLibrary(snapshot.val().users[auth.currentUser.uid]['books'][key])
          buildBookDiv(snapshot.val().users[auth.currentUser.uid]['books'][key])
        }      
      }
      } catch (error) {
      console.log(`Error caught when retieving data from firebase: ${error}`)
    }
    
  }, function (error) {
    console.log("Error: " + error.code + ", data cannot be saved without login.");
  });
} 

function signIn() {
  // firebase.auth().signInWithRedirect(provider);
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [
  //     // List of OAuth providers supported.
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
  //   ],
  //   signInSuccessUrl: 'http://localhost:5500/index.html',
  //   // Other config options...
  // });


  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      populateMyLibrary()
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });


  // firebase.auth()
  // .signInWithPopup(provider)
  // .then((result) => {
  //   /** @type {firebase.auth.OAuthCredential} */
  //   var credential = result.credential;
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  //   populateMyLibrary()
  // }).catch((error) => {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
}
  

function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    bookDiv.innerHTML = ""
  }).catch((error) => {
    // An error happened.
  });
}

