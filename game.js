let gameTimer = null;

function resetGameStart(){
  clearTimeout(gameTimer);

  const splash = document.getElementById("splashScreen");
  const main = document.getElementById("mainScreen");

  splash.style.display = "block";
  main.style.display = "none";

  /* restart animations */
  splash.style.animation = "none";
  main.style.animation = "none";

  void splash.offsetWidth;

  splash.style.animation = "";
  main.style.animation = "";
}

function openGamePopup(){
  document.getElementById("gamePopup").classList.add("show");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap")?.style.setProperty("display","none");

  resetGameStart();

  gameTimer = setTimeout(() => {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
  }, 7000);
}

function closeGamePopup(){
  document.getElementById("gamePopup").classList.remove("show");
  document.body.style.overflow = "";

  document.querySelector(".floatBarWrap")?.style.removeProperty("display");

  clearTimeout(gameTimer);
  resetGameStart();

  updateCartFloat();
}

/* Swipe both sides close */
let gameSwipeStartX = 0;
let gameSwipeStartY = 0;
let gameSwipeEdge = "";

const gamePopup = document.getElementById("gamePopup");

gamePopup.addEventListener("touchstart", function(e){
  const touch = e.touches[0];

  gameSwipeStartX = touch.clientX;
  gameSwipeStartY = touch.clientY;

  const w = window.innerWidth;

  if(gameSwipeStartX <= 28){
    gameSwipeEdge = "left";
  }else if(gameSwipeStartX >= w - 28){
    gameSwipeEdge = "right";
  }else{
    gameSwipeEdge = "";
  }
});

gamePopup.addEventListener("touchend", function(e){
  if(!gameSwipeEdge) return;

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - gameSwipeStartX;
  const diffY = Math.abs(touch.clientY - gameSwipeStartY);

  gameSwipeEdge = "";

  if(diffY > 60) return;

  if(diffX > 90 || diffX < -90){
    closeGamePopup();
  }
});
