var loggedIn = false;

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
        loggedIn = true;
        payNowBtn();
    }
    localStorage.setItem('loginState', 'true');
}
function logout(){
        localStorage.clear();
        document.querySelector("#headerLoginBtn").textContent="LOGIN";
        loggedIn = false;
        payNowBtn();
}


// ______________________________________________Pay Now Button functionality

 if(localStorage.getItem('loginState')==="true"){
  document.querySelector("#payBtn Button").removeAttribute("disabled");

}
function payNowBtn(){
    if(loggedIn===true){
        document.querySelector("#payBtn Button").removeAttribute("disabled");
    }
    else if(loggedIn===false){
        document.querySelector("#payBtn Button").setAttribute("disabled", 0);
    }
}
// ______________________________________________Booking Functionality
document.getElementById("payBtn").addEventListener("click",()=>{alert("Booking Successful!!")})

// display the hotel and payment details by fetching data from the api

const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");

const data = null;
const xhr = new XMLHttpRequest();
document.getElementById("contentDiv").style.display = "none";
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    const jsonData = JSON.parse(this.responseText);
    console.log(jsonData.data);
    getAndSetHotelDetails(jsonData.data[0]);
    document.getElementById("loader").style.display = "none";
    document.getElementById("contentDiv").style.display = "block";
  }
});

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader(
  "x-rapidapi-key",
  "2a3f88c87emshafc3031d71d3ef7p166a1ajsn7db4f52845a3"
);

xhr.send(data);

function getAndSetHotelDetails(data) {
  const name = data.name;
  const address = data.address;
  const ranking = data.ranking;
  const imageUrl = data.photo.images.large.url;

  // get html references
  const refToImage = document.getElementById("hotelImage");
  const refToAddress = document.getElementById("address");
  const refToRanking = document.getElementById("ranking");
  const refToName = document.getElementById("hotelName");

  refToImage.setAttribute("src", imageUrl);
  refToName.innerText = name;
  refToAddress.innerText = address;
  refToRanking.innerHTML = ranking;
}

// set customer and payment details
function setCustomerAndPaymentDetails() {
  const name = urlParams.get("name");
  const adults = urlParams.get("adults");
  const stringFromDate = urlParams.get("fromDate");
  const stringToDate = urlParams.get("toDate");
  // const stringTotal = urlParams.get("total");

  const fromDateArr = stringFromDate.split("-");
  const toDateArr = stringToDate.split("-");

  const fromDate = new Date(stringFromDate);
  const toDate = new Date(stringToDate);

  const noOfDays =
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

  const total = 1000 * noOfDays * parseInt(adults);

  // get ref to the html elements

  const refToName = document.getElementById("cusName");
  const refToAdults = document.getElementById("numOfAdults");
  const refToFromDate = document.getElementById("checkInDate");
  const refToToDate = document.getElementById("checkOutDate");
  const refToTarrifBreakdown = document.getElementById("tarrif");
  const refToTotalAmount = document.getElementById("total");

  // set the values for html references
  refToName.innerText = name;
  refToAdults.innerText = adults;
  refToFromDate.innerText = `${fromDateArr[2]}/${fromDateArr[1]}/${fromDateArr[0]}`;
  refToToDate.innerText = `${toDateArr[2]}/${toDateArr[1]}/${toDateArr[0]}`;
  refToTarrifBreakdown.innerText =`Rs.1000 x ${adults} Adults x ${noOfDays} Nights`;
  refToTotalAmount.innerText = `Rs.${total}`;
}

setCustomerAndPaymentDetails();
getAndSetHotelDetails(data)

