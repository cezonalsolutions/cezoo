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
  }, 3000);
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

let introTimer1, introTimer2, introTimer3;

function hideIntroSteps(){
  document.querySelectorAll(".introStep")
    .forEach(step => step.classList.remove("active"));
}

function startGameIntro(){
  clearTimeout(introTimer1);
  clearTimeout(introTimer2);
  clearTimeout(introTimer3);

  document.getElementById("mainScreen").style.display = "none";
  document.getElementById("gameIntroScreen").style.display = "block";

  hideIntroSteps();
  document.getElementById("clockStep").classList.add("active");

  introTimer1 = setTimeout(() => {
    hideIntroSteps();
    document.getElementById("timeStep").classList.add("active");
  }, 1800);

  introTimer2 = setTimeout(() => {
    hideIntroSteps();
    document.getElementById("countStep").classList.add("active");
let count = 3;
const countEl = document.getElementById("countNumber");

showCount();

function showCount(){

    countEl.className = "countNumber";

    if(count === 3){
        countEl.classList.add("leftAnim");
        countEl.innerText = "3";
    }
    else if(count === 2){
        countEl.classList.add("rightAnim");
        countEl.innerText = "2";
    }
    else if(count === 1){
        countEl.classList.add("zoomAnim");
        countEl.innerText = "1";
    }
    else{
        countEl.classList.add("goAnim");
        countEl.innerText = "GO!";
    }

    count--;

    if(count >= -1){
        setTimeout(showCount,700);
    }else{
        setTimeout(()=>{
            hideIntroSteps();
            document.getElementById("welcomeStep").classList.add("active");
        },700);
    }
}

  }, 3600);
}
