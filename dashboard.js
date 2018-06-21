// logout code
document.getElementById('logoutBtn').addEventListener('click', function () {
    firebase.auth().signOut()
        .then(function () {
            console.log('Logged Out!');
            localStorage.removeItem('user');
        }).catch(function (error) {
            console.log('Error: ', error);
        });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "./index.html"
    }
});

let user = localStorage.getItem('user');
user = JSON.parse(user);

// writing in Database
let dbRef = firebase.database().ref();
document.getElementById('addDeveleporForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let title = document.getElementById('title').value;
    let gitLink = document.getElementById('linkToProfile').value;

    let developerObject = {
        name,  // name : name 
        email, // email: email
        title,
        gitLink
    };

    console.log(developerObject);

    let refNode = firebase.database().ref(user.uid).child("developers");
    refNode.push(developerObject)
        .then(() => {
            console.log('Written in DB');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('title').value = '';
            document.getElementById('linkToProfile').value = ''
        }).catch((error) => {
            console.log(error.message);
        })

});



//Reading from Database

firebase.database().ref(user.uid).child("developers").on('value', (snapshot) => {
    let developersArray = converIntoArray(snapshot);
    printTable(developersArray);
});

// Array conversion 
const converIntoArray = (snapshot) => {
    let developersArray = [];
    snapshot.forEach(childSnapShot => {
        developersArray.push({
            id: childSnapShot.key,
            ...childSnapShot.val()
        });
    });
    return developersArray;
}
var table = document.getElementById('recordShower');

// printing on DOM.
const printTable = (developersArray) => {
    console.log(developersArray);
    table.innerHTML = '';
    developersArray.map((item, index) => {
        let tr = `<td>${item.email}</td><td>${item.name}</td><td>${item.title}</td><td> <a href="${item.getLink}"><i class="fab fa-2x fa-github"></i></a>  </td>`
        table.innerHTML += tr;
    });
}
 
// Delete a developer

document.getElementById('deleteDeveloperForm').addEventListener('submit', (event) => {
    event.preventDefault();
    var devArrayTemp = [];
    firebase.database().ref(user.uid).child("developers").on('value', (snapshot) => {
        devArrayTemp = converIntoArray(snapshot);
    });
    let emailOfDeveloper = document.getElementById('emailForDeletion').value;
    let developerToBeDelete = devArrayTemp.filter(developer => developer.email === emailOfDeveloper);
    console.log(developerToBeDelete[0].id);
    firebase.database().ref(user.uid).child('developers').child(developerToBeDelete[0].id).remove();

});


// update developer 

