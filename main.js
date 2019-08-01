// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCU2xw-osuftMbHMwpYpg5vipGhZ8z4jV4",
    authDomain: "contactform-efede.firebaseapp.com",
    databaseURL: "https://contactform-efede.firebaseio.com",
    projectId: "contactform-efede",
    storageBucket: "contactform-efede.appspot.com",
    messagingSenderId: "438641737378",
    appId: "1:438641737378:web:c341522630e55bac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var messagesRef= firebase.database().ref('messages');


//listen for form Submit
document.getElementById('contactForm').addEventListener('submit',
submitForm);

//submit form
function submitForm(e){
  e.preventDefault();

  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');
  var phone = getInputVal('phone');
  saveMessage(name ,email ,message ,phone );
}

//function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

  //save te message to firebase
  function saveMessage(name, email, message,phone){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email: email,
      message: message,
      phone: phone
    });
  }

function dataCallback(key)
{
  console.log("recapclicked");
}
