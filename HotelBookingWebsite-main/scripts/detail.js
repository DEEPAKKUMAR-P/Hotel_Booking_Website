var pricePerDay = 1000;

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



// ______________________________________________ Data resolution from API
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get("id");

function fetchHotels() {

  const data = null;

  const xhr = new XMLHttpRequest();
  document.getElementById("contentDiv").style.display = "none";
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const jsonData = JSON.parse(this.responseText);
      document.getElementById("loader").style.display = "none";
      document.getElementById("contentDiv").style.display = "block";
      console.log(jsonData.data);
      parseHotelDetails(jsonData.data);
    }
  });

  xhr.open(
    "GET",
    `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${id}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`
  );
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "2a3f88c87emshafc3031d71d3ef7p166a1ajsn7db4f52845a3"
  );

  xhr.send(data);
}

function fetchPhotos() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const jsonData = JSON.parse(this.responseText);

      console.log(jsonData.data);
      parseHotelImages(jsonData.data);
    }
  });

  xhr.open(
    "GET",
    `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${id}&currency=USD&limit=50&lang=en_US`
  );
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader( "x-rapidapi-key", "2a3f88c87emshafc3031d71d3ef7p166a1ajsn7db4f52845a3");

  xhr.send(data);
}


fetchPhotos();
fetchHotels();

function parseHotelImages(data) {
  let carousel = "";
  let isActive = "active";
  data.forEach(getImages);

  function getImages(item) {
    const image = item.images.large.url;

    carousel =
      carousel + `<div class="carousel-item ${isActive}" data-bs-interval="10000">
                    <div class="d-flex justify-content-center">
                      <img src="${image}" class="d-block w-100" alt="">
                    </div> 
                  </div>`;
    isActive = "";
  }
  const carouselDiv = document.getElementsByClassName("carousel-inner")[0];
  carouselDiv.innerHTML = carousel;
}

function parseHotelDetails(data) {
  const name = data[0].name;
  const description = data[0].description;
  const rating = data[0].rating;
  const amenities = data[0].amenities;

  printRating(rating);
  const hotelName = document.getElementById("NameOfHotel");
  hotelName.innerText = name;
  const amenitiesList = document.getElementById("HotelFeatures");
  let liData = "";
  if (amenities.length > 10) {
    for (let i = 0; i < 10; i++) {
      liData = liData + `<li>${amenities[i].name}</li>`;
    }
  } else {
    for (let i = 0; i < amenities.length; i++) {
      liData = liData + `<li>${amenities[i].name}</li>`;
    }
  }

  amenitiesList.innerHTML = liData;

  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText = description;

}

function printRating(rating) {
  let intRating = parseInt(rating);
  let ratingString = "";
  let i = 0;
  let isPositiverating = true;
  const ratingDiv = document.getElementById("rating");
  for (i = 0; i < intRating; i++) {
    ratingString = ratingString + `<i class="fa-solid fa-star rating"></i>`;
  }
  if (rating.length > 1 && rating[2] != "0") {
    isPositiverating = false;
    ratingString =
      ratingString + `<i style="color: orange" class="fa-solid fa-star-half-stroke rating"></i>`;

    i = i + 1;
  }
  for (let j = i; j < 5; j++) {
    ratingString = ratingString + `<i class="fa-solid fa-star"></i>`;
  }

  ratingDiv.innerHTML = ratingString;
}

function setIdOfTheHotel() {
  const refToID = document.getElementById("id");
  refToID.value = id;
}
setIdOfTheHotel();


// ______________________________________________Price Calculation functionality

for(let i =0 ; i<4 ; i++){
  document.querySelectorAll("#form input")[i].addEventListener("change", calculateprice)
}

function calculateprice() {
  document.querySelector("#checkOutDate").setAttribute("min", document.querySelector("#checkInDate").value);
  var noOfguest = document.querySelector("#noOfGuest").value

  
  var d1 = new Date(document.querySelector("#checkInDate").value);   
  var d2 = new Date(document.querySelector("#checkOutDate").value);   

  var diff = d2.getTime() - d1.getTime();   

  var daydiff = diff / (1000 * 60 * 60 * 24);   


  var price = daydiff * noOfguest * pricePerDay;


  document.querySelector("#price").value = price;
}



// date.setDate(date.getDate() + 1);