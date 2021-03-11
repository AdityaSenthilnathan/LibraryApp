import * as firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDOowVOLQ5KRFaq0-tW2AjoK9fxEbngdMQ",
    authDomain: "libraryapp-1d3c8.firebaseapp.com",
    databaseURL: "https://libraryapp-1d3c8-default-rtdb.firebaseio.com",
    projectId: "libraryapp-1d3c8",
    storageBucket: "libraryapp-1d3c8.appspot.com",
    messagingSenderId: "136681181613",
    appId: "1:136681181613:web:521ffec71b01467516d124"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()