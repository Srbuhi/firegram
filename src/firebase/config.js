import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';
import { getStorage }    from 'firebase/storage';
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8LE9s0WSNLdDEaAF0mKRhPrtHj1mZ_Qk",
    authDomain: "firegram-s-ce092.firebaseapp.com",
    projectId: "firegram-s-ce092",
    storageBucket: "firegram-s-ce092.appspot.com",
    messagingSenderId: "680198243288",
    appId: "1:680198243288:web:b70e5fbea09825251628ad"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const projectStorage = getStorage();
  const projectFirestore = getFirestore();

  export{ projectStorage, projectFirestore }