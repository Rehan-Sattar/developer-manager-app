
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD59VtQ6Q2-nQGKJIo2mRo6ZfcvoVnH0QY",
    authDomain: "develoepr-manager.firebaseapp.com",
    databaseURL: "https://develoepr-manager.firebaseio.com",
    projectId: "develoepr-manager",
    storageBucket: "develoepr-manager.appspot.com",
    messagingSenderId: "132987399319"
};
var firebase = firebase.initializeApp(config);

var auth = firebase.auth();

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(email, password);

    auth.signInWithEmailAndPassword(email, password)
        .then(function (data) {
            //     console.log("Data Response: ",data);
            //     // local storage.. 
            //     //writing
            //     localStorage.setItem("user", JSON.stringify(data.user) ); 
            //     // get 
            //    let user = localStorage.getItem("user");
            //    user = JSON.parse(user)
            //    console.log('User OBject from Local Storage: ', user);
            //    /// remove 
            //     setTimeout( () => {
            //         localStorage.removeItem('user');
            //     }, 2000);

            localStorage.setItem('user', JSON.stringify(data.user));
        })

        .catch(function (error) {
            console.log(error.message);
        })
});


auth.onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "../dashboard.html";
    }
});



















