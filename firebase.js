
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

  const app = initializeApp({
    apiKey: "AIzaSyAh4DRYF1xVmjWMpBts1YWZ_xgcPgjnVgo",
    authDomain: "ludicao-a04b3.firebaseapp.com",
    databaseURL: "https://ludicao-a04b3-default-rtdb.firebaseio.com",
    projectId: "ludicao-a04b3",
    storageBucket: "ludicao-a04b3.appspot.com",
    messagingSenderId: "566094852991",
    appId: "1:566094852991:web:9139c2397f75b86273e04a",
    measurementId: "G-45X9NKZRTR"
  });
  const db = getFirestore(app);

  export { db, collection, addDoc }

  // const querySnapshot = await getDocs(collection(db, "Clientes"));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data())
  // console.log(`${doc.id} => ${doc.data().Nome}`);
  // });

  



