
//_____________________________________________Header Template


let headerTemplate = `<header>
<a id="logoAnchor" href="index.html"><img id="logo" src="./assests/images/logo.png" height="150px" width="160px" alt="Logo"></a>
<div id="loginDiv">
  <button id="headerLoginBtn" class="btn btn-light" data-toggle="modal" data-target="#login-modal" type="button">
    LOGIN
  </button>
</div>
</header>`


//______________________________________________Footer Template

let footerTemplate = `<footer>
<div id="contactDiv">
  <button data-toggle="modal" data-target="#contact-modal" class="btn btn-info">
    <p id="contactBtn" style="color: #000;">Contact Us</p>
  </button>
</div>
<div id="copyrightDiv">
  <p id="copyright">Ⓒ 2022 Deepak_Project</p>
</div>
<div id="socialMediaDiv">
  <a href="https://www.facebook.com" target="_blank"><img class="socialMedia" src="assests/images/facebook.png" alt="facebook"></a>
  <a href="https://www.instagram.com" target="_blank"><img class="socialMedia" src="assests/images/instagram.png" alt="instagram"></a>
  <a href="https://www.twitter.com" target="_blank"><img class="socialMedia" src="assests/images/twitter.png" alt="twitter"></a>
</div>
</footer>`




//______________________________________ Header & Footer Application  

document.getElementById("container").innerHTML = headerTemplate + document.getElementById("container").innerHTML;
document.getElementById("container").innerHTML = document.getElementById("container").innerHTML+ footerTemplate;


// ___________________________________________________Login State 

function restoreLogin(){
  document.querySelector("#headerLoginBtn").innerText="LOGOUT";
  document.querySelector("#headerLoginBtn").dataset.toggle = "modal hide";
}

if(localStorage.getItem('loginState')==="true"){
restoreLogin();  
}
