

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

// sign in function here..


document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('userName', name);
        }).catch(function (error) {
            console.log('Error:', error);
        });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "../dashboard.html"
    }
})