import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

let map;
const markers = [];
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
let labelIndex = 0;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 35.2122, lng: 128.582 },
    zoom: 17,
  });

  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });

  const querySnapshot = await getDocs(collection(db, 'pinName'));
  querySnapshot.forEach((doc) => {
  const { lat, lng, name } = doc.data();
  console.log("lat :",lat, "lng :",lng);
  const marker = addMarker({ lat, lng }, map);
  attachInfo(marker, name)
});
  
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log( latitude + ', ' + longitude );
    var Bcoordinate = { lat: latitude, lng: longitude };
    let openwin = window.open("http://localhost:65529/info/popup.html", "infopopup", "width=500, height=500, top=100");
    // latitude = openwin.document.getElementById("lat_val").value
    // longitude = openwin.document.getElementById("lng_val").value
    openwin.onload = function () {
    openwin.localStorage.setItem('coordinate', JSON.stringify(Bcoordinate));
  }
  });
}
  
// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  const marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
  markers.push(marker);
  return marker;
}



function attachInfo(marker, name) {
  const infowindow = new google.maps.InfoWindow({
    content: name,
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);

attachInfo(marker, "");
}




initMap();

//https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0