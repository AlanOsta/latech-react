import firebase from "firebase/app"
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDZmf_SCYFwD8Ng49kXlqriCK4W16pRt2U",
    authDomain: "latech-react.firebaseapp.com",
    projectId: "latech-react",
    storageBucket: "latech-react.appspot.com",
    messagingSenderId: "622787516364",
    appId: "1:622787516364:web:d67757ada1cfdd64ffaf69"
    };

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
