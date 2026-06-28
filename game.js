setTimeout(function(){
    document.getElementById("splashScreen").style.display="none";
    document.getElementById("mainScreen").style.display="block";
},7000);

function openGamePopup(){
  document.getElementById("gamePopup").classList.add("show");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap")?.style.setProperty("display","none");
}

function closeGamePopup(){
  document.getElementById("gamePopup").classList.remove("show");
  document.body.style.overflow = "";

  document.querySelector(".floatBarWrap")?.style.removeProperty("display");

  updateCartFloat(); // restore cart/delivery normal state
}