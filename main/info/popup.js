
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyAxg_K4mtgZj0x_uzJA_pJpt7hnfiR4Wz0",
  authDomain: "lostitems-9aef1.firebaseapp.com",
  projectId: "lostitems-9aef1",
  storageBucket: "lostitems-9aef1.appspot.com",
  messagingSenderId: "811773546894",
  appId: "1:811773546894:web:34e7acff3cc07e3eaa94df",
  measurementId: "G-598RBQ2EYQ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const btn = document.getElementById('btn');
// btn.addEventListener('click', readData);

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


document.getElementById('btn').onclick = async function () {
  const coordinate = JSON.parse(localStorage.getItem('coordinate'));
  const lat = coordinate.lat;
  const lng = coordinate.lng;
  try {
    const docRef = await addDoc(collection(db, "pinName"), {
      name: pinName.value,
      lat: lat,
      lng: lng
    });
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
  window.close();
}
