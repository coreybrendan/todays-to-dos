// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxWkz8E3P5XYb9AmKWIkFNkHLwu6qay_M",
  authDomain: "todays-2-dos.firebaseapp.com",
  projectId: "todays-2-dos",
  storageBucket: "todays-2-dos.appspot.com",
  messagingSenderId: "200176359999",
  appId: "1:200176359999:web:b18560bd0a874def8d768a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase database
const dbRef = firebase.database().ref();

const formElement = document.querySelector('form');
const ulElement = document.querySelector('ul');

formElement.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const inputElement = document.querySelector('input');
  const task = inputElement.value;

  if (task) {
    // for every to-do task, organize the description into an object before pushing to firebase
    const toDoObj = {
      description: task,
    }

    // push to firebase our new toDoObj
    dbRef.push(toDoObj);

    // reset input field to empty string
    inputElement.value = '';
  }
});

// use firebase method on() to listen for changes to database
// on takes two arguments: an event, and a callback function
// for in loop to construct the li (with markup) and then push() each one into an empty array

dbRef.on('value', function(data) {
  const toDoData = data.val();
  
  const arrayOfToDos = [];

  for (prop in toDoData) {
    const listItemElement = document.createElement('li');
    listItemElement.innerHTML = `<i class="far fa-square"></i>`;
    listItemElement.appendChild(document.createTextNode(toDoData[prop].description));

    arrayOfToDos.push(listItemElement.outerHTML);

    // we have array of <li>'s, lets put them in the ul HTML element
    ulElement.innerHTML = arrayOfToDos.join('');
  };

});

ulElement.addEventListener('click', function(e) {
  if (e.target.tagName === 'I') {
    // do this task
    updateToDo(e.target);
  }

});

// create our updateToDo function:
const updateToDo = (icon) => {

  icon.classList.toggle('fa-square');
  icon.classList.toggle('fa-check-square');
  icon.parentElement.classList.toggle('text-muted');
};