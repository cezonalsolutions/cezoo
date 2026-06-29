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

  clearInterval(timerInterval);
  running = false;
const coupon = document.getElementById("couponResultScreen");
coupon.style.display = "none";
coupon.classList.remove("playArc");
  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

  resetGameStart();

  gameTimer = setTimeout(() => {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
  }, 3000);
}
function closeGamePopup(){
  document.getElementById("gamePopup").classList.remove("show");
  document.body.style.overflow = "";
const coupon = document.getElementById("couponResultScreen");
coupon.style.display = "none";
coupon.classList.remove("playArc");
  document.querySelector(".floatBarWrap")?.style.removeProperty("display");

  clearTimeout(gameTimer);
  clearTimeout(introTimer1);
  clearTimeout(introTimer2);
  clearTimeout(introTimer3);
  clearInterval(timerInterval);

  running = false;

  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

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

async function startGameIntro(){
  clearTimeout(introTimer1);
  clearTimeout(introTimer2);
  clearTimeout(introTimer3);

  // mic asks ONLY after Play Now click
  try{
    if(!micStream){
      micStream = await navigator.mediaDevices.getUserMedia({ audio:true });

      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = .92;

      const mic = audioContext.createMediaStreamSource(micStream);
      mic.connect(analyser);

      dataArray = new Uint8Array(analyser.frequencyBinCount);
      if(audioContext.state === "suspended"){
  await audioContext.resume();
}
    }
  }catch(err){
    alert("Please allow microphone permission.");
    return;
  }

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

          // 15 sec game starts here
          resetGame();
          running = true;
          detectVoice();
          startTimer();

        },700);
      }
    }

    showCount();

  }, 3600);
}


let audioContext, analyser, dataArray, micStream;
let currentScore = 0;
let targetScore = 0;
let maxScore = 0;
let timeLeft = 15;
let displayScore = 0;
let running = false;
let timerInterval;
let difficulty = "easy"; // easy / medium / hard

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const waterLayer = document.getElementById("waterLayer");
const skyOverlay = document.querySelector(".skyOverlay");

async function startGame(){
    try{
        if(!micStream){
          micStream = await navigator.mediaDevices.getUserMedia({
  audio:{
    echoCancellation:false,
    noiseSuppression:false,
    autoGainControl:true
  }
});
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            analyser.smoothingTimeConstant = .92;

            const mic = audioContext.createMediaStreamSource(micStream);
            mic.connect(analyser);

            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }

        
        resetGame();
        running = true;
        detectVoice();
        startTimer();

    }catch(err){
        alert("Please allow microphone permission.");
    }
}

function resetGame(){
    currentScore = 0;
    targetScore = 0;
    maxScore = 0;
    timeLeft = 15;
displayScore = 0;
    scoreEl.innerText = "0";
    scoreEl.classList.remove("finalZoom");
    timerEl.innerText = "15s";
  waterLayer.style.transition = "transform .18s linear";
waterLayer.style.transform = "translateY(0px)";
skyOverlay.style.transform = "none";
    clearInterval(timerInterval);
}

function startTimer(){
  clearInterval(timerInterval);

  timerInterval = setInterval(()=>{
    timeLeft--;
    timerEl.innerText = timeLeft + "s";

    if(timeLeft <= 0){
      running = false;
      clearInterval(timerInterval);

      scoreEl.innerText = maxScore;

      scoreEl.classList.remove("finalZoom");
      void scoreEl.offsetWidth;
      scoreEl.classList.add("finalZoom");

      setTimeout(()=>{
  showCouponResult();
},1200);
    }
  },1000);
}
function getDifficultyLimit(){
    if(currentScore < 30){
        difficulty = "easy";
        return 50;
    }

    if(currentScore < 50){
        difficulty = "medium";
        return 65;
    }

    difficulty = "hard";
    return 100;
}

function detectVoice(){
    if(!running) return;

    analyser.getByteFrequencyData(dataArray);

    let total = 0;
    let highSound = 0;

    for(let i = 0; i < dataArray.length; i++){
        total += dataArray[i];

        if(dataArray[i] > 95){
            highSound++;
        }
    }

    let volume = total / dataArray.length;

    /* air / small noise ignore */
    if(volume < 25 || highSound < 3){
        targetScore = 0;
    }else{
        let limit = getDifficultyLimit();

        let sensitivity = 1;

        if(difficulty === "easy"){
            sensitivity = 0.75;
        }

        if(difficulty === "medium"){
            sensitivity = 0.52;
        }

        if(difficulty === "hard"){
            sensitivity = 0.35;
        }

        targetScore = Math.floor((volume - 25) * sensitivity * 2.2);
        if(targetScore < 0) targetScore = 0;
        if(targetScore > limit) targetScore = limit;
    }

    if(targetScore > currentScore){
        currentScore += (targetScore - currentScore) * 0.11;
    }else{
        currentScore += (targetScore - currentScore) * 0.08;
    }

    if(currentScore < 0) currentScore = 0;
    if(currentScore > 100) currentScore = 100;

   let showScore = Math.round(currentScore);

if(displayScore < showScore){
    displayScore++;
}else if(displayScore > showScore){
    displayScore--;
}

if(displayScore !== Number(scoreEl.innerText)){
    scoreEl.classList.remove("scoreJump");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("scoreJump");
}

scoreEl.innerText = displayScore;

if(displayScore > maxScore){
    maxScore = displayScore;
}

    let moveUp;

    if(showScore >= 100){
        moveUp = window.innerHeight;
    }else{
        moveUp = showScore * 4.2;
    }

    waterLayer.style.transform = `translateY(-${moveUp}px)`;

    requestAnimationFrame(detectVoice);
}



function showCouponResult(){
  const coupon = document.getElementById("couponResultScreen");

  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

  coupon.style.display = "flex";
  coupon.classList.add("playArc");

  document.getElementById("couponScoreNumber").innerText = maxScore;
}

function generateCouponCode(){
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let code = "";

  for(let i = 0; i < 4; i++){
    code += letters[Math.floor(Math.random() * letters.length)];
  }

  for(let i = 0; i < 2; i++){
    code += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return code;
}
function getDiscountByScore(score){
  if(score < 50){
    return { won:false };
  }

  if(score < 60){
    return { won:true, percent:"10%", amount:"150" };
  }

  if(score < 70){
    return { won:true, percent:"12%", amount:"180" };
  }

  if(score < 80){
    return { won:true, percent:"15%", amount:"200" };
  }

  return { won:true, percent:"20%", amount:"250" };
}

function showCouponResult(){
  const coupon = document.getElementById("couponResultScreen");

  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

  const result = getDiscountByScore(maxScore);

  coupon.style.display = "flex";
  coupon.classList.add("playArc");

  document.getElementById("couponScoreNumber").innerText = maxScore;

  const topText = coupon.querySelector(".topi");
  const offerBox = coupon.querySelector(".offered");
  const uptoBox = coupon.querySelector(".upto");
  const bottomText = coupon.querySelector(".bottom");

  if(result.won){
    topText.innerText = "YOU WON EXTRA";

    offerBox.innerHTML = `
      <span>${result.percent}</span>
      <span>OFF</span>
    `;

    uptoBox.style.display = "block";
    uptoBox.innerHTML = `UP TO ₹<span>${result.amount}</span>`;
  }else{
    topText.innerText = "OOPS!";

    offerBox.innerHTML = `
      <span style="font-size:30px;line-height:1.1;">BETTER LUCK</span><br>
      <span style="font-size:30px;line-height:1.1;">NEXT TIME</span>
    `;

    uptoBox.style.display = "block";
    uptoBox.innerHTML = "&nbsp;";
  }

  bottomText.innerHTML = `
    Applicable on Ordering Select Items<br>
    above ₹150
  `;
}

