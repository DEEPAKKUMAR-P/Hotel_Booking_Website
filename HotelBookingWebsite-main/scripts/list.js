// ______________________________________________Login and Logout functionality

document.querySelector("#loginModalBtn").addEventListener("click", function(){
    login();
})

document.querySelector("#headerLoginBtn").addEventListener("click", function(){
    if(document.querySelector("#headerLoginBtn").innerText==="LOGIN"){
        document.querySelector("#headerLoginBtn").dataset.toggle = "modal";
    }
    logout();
})

function login(){
    localStorage.setItem('username', document.querySelector("#username").value);
    localStorage.setItem('password', document.querySelector("#password").value);
    if(document.querySelector("#headerLoginBtn").innerText==="LOGIN" && localStorage.getItem('username')==="admin" && localStorage.getItem('password')==="admin"){
        document.querySelector("#headerLoginBtn").innerText="LOGOUT";
        alert("successfully LoggedIn");
        document.querySelector("#loginModalClose").click();
        document.querySelector("#headerLoginBtn").dataset.toggle = "modal hide";
    }
    localStorage.setItem('loginState', 'true');
}
function logout(){
        localStorage.clear();
        document.querySelector("#headerLoginBtn").textContent="LOGIN";
}


// ______________________________________________ Getting city from the Url

const url = window.location.search;
const urlParams = new URLSearchParams(url);
const city = urlParams.get("city");
let coOrdinates = [{ lat: 18.926977, lng: 72.82045 }]

const data = null;

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var jsonData = JSON.parse(this.responseText);

    populateListView(jsonData.data);
    document.getElementById("loader").style.display = "none";
    document.getElementById("container").style.display = "block";
    initMap();
  }
};

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`,
  true
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "2a3f88c87emshafc3031d71d3ef7p166a1ajsn7db4f52845a3");

xhr.send(data);

let populateListView = (data) => {
  let name, img, address, locationId, rating;
  let hotel = "";
  coOrdinates = [];
  const populateArrays = (item) => {
    if (item.result_type == "lodging") {
      name = item.result_object.name;
      img = item.result_object.photo.images.large.url;
      address = item.result_object.address;
      locationId = item.result_object.location_id;
      rating = item.result_object.rating;
      coOrdinates.push({
        lat: parseFloat(item.result_object.latitude),
        lng: parseFloat(item.result_object.longitude),
        locationId: locationId,
        name: name,
        address: address});

      hotel = hotel +
        
      `
        <div class="hotelDivs ">
            <a href="detail.html?id=${locationId}">  
            <img class="hotelImage" src="${item.result_object.photo.images.large.url}" alt="${name}">
            </a>
            <div class="description">
            <a href="detail.html?id=${locationId}">  <h3>${name}</h3> </a>
            <a href="detail.html?id=${locationId}">  <p>${rating}<i class=" ratingStars  fa-solid fa-star rating"></i></p> </a>
            <a href="detail.html?id=${locationId}">  <p>${address}</p> </a>
            </div> 
        </div>
      `;
    }
  };
  // debugger
  data.forEach(populateArrays);

  let listView = document.getElementById("listView");
  listView.innerHTML = hotel;
};

// _____________________________________________________________MAP Functionality


let map;

function initMap() {
  var options = {
    center: { lat: coOrdinates[0].lat, lng: coOrdinates[0].lng },
    zoom: 10,
  };
  map = new google.maps.Map(document.getElementById("mapView"), options);

  for (let i = 0; i < coOrdinates.length; i++) {
    addMarker(coOrdinates[i]);
  }

  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: { lat: props.lat, lng: props.lng },
      map: map,
      
    });

    let infoWindow = new google.maps.InfoWindow({
      content: `<p>${props.name}</p>
                <a href="detail.html?id=${props.locationId}">Book Now</a>`,
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}
