import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

let map;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 35.2122, lng: 128.582 },
    zoom: 17,
  });
  
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log( latitude + ', ' + longitude );
    var Bcoordinate = { lat: latitude, lng: longitude };
    let openwin = window.open("http://localhost:65529/info/popup.html", "infopopup", "width=500, height=500, left=100, top=100");
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
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
}


function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
}


const docRef = doc(db, "pinName", "");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}






initMap();

//https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0