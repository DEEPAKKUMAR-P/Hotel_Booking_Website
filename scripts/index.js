
// _________________________________________________Disabling Logo clicking on header 

document.querySelector("#logoAnchor").style.pointerEvents = "none";



// ______________________________________________Login and Logout functionality

var loginState = false;

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


// _________________________________________________View More Button Functionality

document.querySelector("#cityDiv2").style.display = "none";

document.querySelector("#viewMore").addEventListener("click", viewMore)

function viewMore(){
    if(document.querySelector("#viewMore").innerText === "View More"){
        document.querySelector("#cityDiv2").style.display = "";
        document.querySelector("#viewMore").innerText = "View Less";
    }
    else{
        document.querySelector("#cityDiv2").style.display = "none";
        document.querySelector("#viewMore").innerText = "View More";
    }
    }


// _________________________________________________Search Bar Functionality

const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("input", searchForCity);

function searchForCity() {
  let cityName = searchBar.value;
  if (cityName.length >= 3) {
    const data = null;

    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === this.DONE) {
        let jsonData = JSON.parse(this.responseText);
        console.log("search details");
        console.log(jsonData.data.Typeahead_autocomplete.results);
        parseSearchResults(jsonData.data.Typeahead_autocomplete.results);
      }

    });


    xhr.open(
      "GET",
      `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${cityName}&lang=en_US&units=km`
    );
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "2a3f88c87emshafc3031d71d3ef7p166a1ajsn7db4f52845a3"
    );

    xhr.send(data);
  } 
  
  else {
    document.getElementById("search-result").innerHTML = "";
  }

  function parseSearchResults(data) {
    let displayResult = "";
    data.forEach(getText);

    let searchData = [];

    function getText(item) {
      if (item.detailsV2 != undefined && item.detailsV2.placeType == "CITY") {
        displayResult =
          displayResult +
          `<a href="list.html?city=${item.detailsV2.names.name}">${item.detailsV2.names.name}</a>`;
      }
    }

    const searchBarContent = document.getElementById("search-result");
    searchBarContent.innerHTML = displayResult;
  }
}